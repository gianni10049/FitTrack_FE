import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * Codegen tipi-only (stile `.cursor/examples/graphql`):
 * le operazioni `gql` restano in `src/lib/graphql/<Dominio>/operations/*.ts`.
 * Avvia il backend prima di `yarn codegen` (default :4000).
 */
const schemaUrl =
  process.env.CODEGEN_GRAPHQL_SCHEMA_URL?.trim() ||
  "http://127.0.0.1:4000/graphql";

const config: CodegenConfig = {
  overwrite: true,
  allowPartialOutputs: true,
  generates: {
    "./src/lib/graphql/project_schema.graphql": {
      schema: schemaUrl,
      plugins: ["schema-ast"],
    },
    "./src/lib/graphql/graphql.ts": {
      schema: "./src/lib/graphql/project_schema.graphql",
      plugins: ["typescript"],
    },
  },
};

export default config;
