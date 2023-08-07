import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'

export default defineConfig({
  name: 'default',
  title: 'personal_blog_',

  projectId: 't1678sq6',
  dataset: 'production',

  plugins: [deskTool(), visionTool() ,  vercelDeployTool()],

  schema: {
    types: schemaTypes,
  },
})

// import { defineConfig } from 'sanity'
// import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'

// export default defineConfig({
//   // ...
//   plugins: [
//     // ...
//     vercelDeployTool(),
//   ],
// })