import type { CodegenConfig } from '@graphql-codegen/cli'
import { env } from 'env/enviroment'

const config: CodegenConfig = {
  overwrite: true,
  // schema: "http://198.168.0.31/api/graphql",
  schema: "http://127.0.0.1:3000/api/graphql",
  documents: './src/**/*.graphql',
  generates: {
    './graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        addExplicitOverride: true
      }
    }
  }
}
export default config
