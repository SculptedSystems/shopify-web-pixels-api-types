# @sculptedsystems/shopify-web-pixels-api-types

TypeScript type definitions for the [Shopify Web Pixels API](https://shopify.dev/docs/api/web-pixels-api).  
Use these types to add static safety and autocompletion when building or extending Shopify pixel scripts.

## What Is This Package?

This package provides TypeScript definitions for the objects and methods exposed by Shopify’s Web Pixels runtime.

## Why Use It?

If you’re building or debugging custom pixels, you can:

- Get autocomplete and type checking for the Web Pixels API.
- Catch event name and payload mistakes early.
- Use familiar TypeScript tooling in your pixel development workflow.

## Installation

```bash
npm install @sculptedsystems/shopify-web-pixels-api-types
```

or

```bash
yarn add @sculptedsystems/shopify-web-pixels-api-types
```

## Usage

Import types directly in your pixel script or TypeScript configuration.

```ts
import type { Checkout } from "@sculptedsystems/shopify-web-pixels-api-types";
```

If you prefer global types, simply reference the package in your tsconfig.json:

```json
{
  "compilerOptions": {
    "types": ["@sculptedsystems/shopify-web-pixels-api-types"]
  }
}
```

## Distribution

This package ships only type definitions (.d.ts files).

It has no runtime code, no dependencies, and zero overhead.
