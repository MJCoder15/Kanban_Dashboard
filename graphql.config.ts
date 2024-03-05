import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  // defining graphQL schema provided by Refine
  schema: "https://api.crm.refine.dev/graphql",
  extensions: {
    // codegen is a plugin that generates typescript types from GraphQL schema
    // https://the-guild.dev/graphql/codegen
    codegen: {
      hooks: {
        afterOneFileWrite: ["eslint --fix", "prettier --write"],
      },
    
      generates: {
        "src/graphql/schema.types.ts": {
         
          plugins: ["typescript"],
         
          config: {
            skipTypename: true, 
            enumsAsTypes: true, 
            scalars: {
              // DateTime is a scalar type that is used to represent date and time
              DateTime: {
                input: "string",
                output: "string",
                format: "date-time",
              },
            },
          },
        },
       
        "src/graphql/types.ts": {
          
          preset: "import-types",
          documents: ["src/**/*.{ts,tsx}"],
          // plugins is used to define the plugins that will be used to generate typescript types from GraphQL operations
          plugins: ["typescript-operations"],
          config: {
            skipTypename: true,
            enumsAsTypes: true,
           
            preResolveTypes: false,
            
            useTypeImports: true,
          },
          // presetConfig is used to define the config of the preset
          presetConfig: {
            typesPath: "./schema.types",
          },
        },
      },
    },
  },
};

export default config;