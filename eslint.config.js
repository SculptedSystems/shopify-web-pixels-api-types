// @ts-check

import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([globalIgnores(["./dist/*"])], prettierConfig);
