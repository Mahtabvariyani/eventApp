// schemas/pet.js
export default {
  name: 'blog',
  type: 'document',
  title: 'Blog of Event',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title of blog event Article',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of the blog ',
      options: {
        source: 'name',
      },
    },
    {
      name: 'image',
      type: 'image',
      title: 'Title Image',
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
}
