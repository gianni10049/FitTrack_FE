import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * Schema via introspection: avvia il backend prima di `yarn codegen`.
 * Override: `CODEGEN_GRAPHQL_SCHEMA_URL` (es. CI con API già su).
 */
const schemaUrl =
  process.env.CODEGEN_GRAPHQL_SCHEMA_URL?.trim() ||
  "http://127.0.0.1:4000/graphql";

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaUrl,
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        documentMode: "graphQLTag",
        gqlImport: "@apollo/client#gql",
      },
    },
  },
};

export default config;
