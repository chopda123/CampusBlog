import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'comment',
  type: 'document', 
  fields: [
    defineField({
      name: 'name',     
      type: 'string',
    }),
    defineField({
      name: 'Approved',
      title: 'Approved',
      type: 'boolean',
      description:"commenrs wont show on the site without approval",
      
    }),
    defineField({
      name: 'email',
      type: 'string',
     
    }),
    defineField({
      name: 'comment',
      type: 'text',      
    }),
    defineField({
        name: 'post',
        type: 'reference',
        to: {type:'post'},
    }),
  ],
 
})
