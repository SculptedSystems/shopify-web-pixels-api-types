#!/usr/bin/env ts-node

import * as fs from "fs";
import * as path from "path";

export interface ExtractedType {
  name: string;
  code: string;
}

/**
 * Extract all type definitions (interfaces, enums, types) from markdown.
 */
export function extractTypes(markdown: string): ExtractedType[] {
  const typeHeaderRegex =
    /^\s*-\s*(?:[\w\d_]+\s*:\s*)?(?:export\s+)?(interface|enum|type)\s+(\w+)/gm;

  const extracted: ExtractedType[] = [];
  let match: RegExpExecArray | null;

  while ((match = typeHeaderRegex.exec(markdown)) !== null) {
    const [, kind, name] = match;
    const startIndex = match.index;

    const braceIndex = markdown.indexOf("{", match.index);

    // Multi-line: capture balanced braces
    let depth = 0;
    let endIndex = braceIndex;
    for (; endIndex < markdown.length; endIndex++) {
      const ch = markdown[endIndex];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      if (depth === 0 && ch === "}") {
        endIndex++;
        break;
      }
    }

    const code = markdown.slice(startIndex, endIndex).trim();
    extracted.push({ name, code });
  }

  return extracted;
}

/**
 * Normalize code by:
 *  - removing the leading "- Label:" prefix
 *  - ensuring it starts with `export`
 */
export function normalizeExtractedCode(code: string): string {
  let cleaned = code.replace(/^\s*-\s*[\w\d_]+\s*:\s*/m, "").trim();

  // Add "export " if missing before the main keyword
  if (!/^export\s+/.test(cleaned)) {
    cleaned = cleaned.replace(/^(interface|enum|type)\s+/, "export $1 ");
  }

  // Remove optional markers — turn `key?:` into `key:`
  // This will catch both indented and inline forms.
  cleaned = cleaned.replace(/(\b\w+)\s*\?:/g, "$1:");

  return cleaned;
}

/**
 * Identify which known type names appear in this code block.
 */
export function findTypeRefs(
  code: string,
  allNames: Set<string>,
  excludeName: string,
): string[] {
  const refs: string[] = [];
  for (const name of allNames) {
    if (name === excludeName) continue;
    const regex = new RegExp(`\\b${name}\\b`, "g");
    if (regex.test(code)) refs.push(name);
  }
  return refs;
}

/**
 * Build the contents of a type file (imports + code).
 */
export function buildTypeFile(
  extracted: ExtractedType,
  allNames: Set<string>,
): string {
  const cleanCode = normalizeExtractedCode(extracted.code);
  const refs = findTypeRefs(cleanCode, allNames, extracted.name);
  const importLines =
    refs.length > 0 ? `import { ${refs.join(", ")} } from "@";\n\n` : "";
  return `${importLines}${cleanCode}\n`;
}

/**
 * Deduplicate, write files, and create index.ts.
 */
export function writeOutput(
  extracted: ExtractedType[],
  outputDir: string,
): void {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const uniqueByName = new Map<string, ExtractedType>();
  for (const t of extracted) {
    if (!uniqueByName.has(t.name)) uniqueByName.set(t.name, t);
    else console.warn(`⚠️ Duplicate type skipped: ${t.name}`);
  }

  const unique = Array.from(uniqueByName.values());
  const allNames = new Set(unique.map((e) => e.name));

  for (const item of unique) {
    const content = buildTypeFile(item, allNames);
    const filePath = path.join(outputDir, `${item.name}.ts`);
    fs.writeFileSync(filePath, content, "utf-8");
    console.log("✅ Extracted:", filePath);
  }

  const indexPath = path.join(outputDir, "index.ts");
  const indexContent = Array.from(uniqueByName.keys())
    .map((name) => `export * from "./${name}";`)
    .join("\n");
  fs.writeFileSync(indexPath, indexContent + "\n", "utf-8");

  console.log(`✨ Done. Wrote ${unique.length} unique types + index.ts`);
}

/**
 * CLI entrypoint.
 */
export function main() {
  const [, , inputFile, outputDir] = process.argv;
  if (!inputFile || !outputDir) {
    console.error(
      "Usage: ts-node scripts/extract-types.ts <input.md> <outputDir>",
    );
    process.exit(1);
  }

  const markdown = fs.readFileSync(inputFile, "utf-8");
  const extracted = extractTypes(markdown);

  if (extracted.length === 0) {
    console.warn("⚠️ No exported types found in", inputFile);
    process.exit(0);
  }

  writeOutput(extracted, outputDir);
}

if (require.main === module) main();
