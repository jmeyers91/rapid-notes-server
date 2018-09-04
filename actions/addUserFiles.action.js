const path = require('path');

module.exports = rapid => rapid.action(
  'addUserFiles', 
  {
    type: 'object',
    required: [ 'userId', 'files' ],
    properties: {
      userId: { type: 'integer' },
      files: {
        type: 'array',
        items: { 
          type: 'object',
          properties: {
            path: { type: 'string' },
            mimetype: { type: 'string' },
          },
        },
      },
    },
  },
  async ({ userId, files }) => {
    const { models } = rapid;
    const { UserFile } = models;

    const fileObjects = files.map(({ path : filepath, mimetype }) => {
      const parts = path.parse(filepath);
      const name = parts.name.replace(/.*___/, '');

      return {
        name,
        mimetype,
        ownerId: userId,
        path: filepath,
      };
    });

    return UserFile.query().insert(fileObjects).returning('*');
  },
);
