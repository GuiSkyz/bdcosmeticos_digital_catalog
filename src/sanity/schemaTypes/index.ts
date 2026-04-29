import { type SchemaTypeDefinition } from 'sanity'

import {perfumeType} from './perfumeType'
import {notaOlfativaType} from './notaOlfativaType'
import {siteSettingsType} from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [perfumeType, notaOlfativaType, siteSettingsType],
}
