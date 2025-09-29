import product from './product'
import specDefinition from './specDefinition'

export const schema = {
  types: [product, specDefinition],
}

console.log("✅ Loaded schema types:", schema)