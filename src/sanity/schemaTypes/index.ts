import { type SchemaTypeDefinition } from 'sanity'

import {perfumeType} from './perfumeType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [perfumeType],
}
