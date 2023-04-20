import type { CodegenConfig } from '@graphql-codegen/cli'
import { env } from 'env/enviroment'
 
const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
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