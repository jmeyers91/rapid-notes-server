const del = require('del');

module.exports = rapid => rapid.action(
  'deleteFiles', 
  {
    type: 'object',
    required: [ 'userId', 'fileIds' ],
    properties: {
      userId: { type: 'integer' },
      fileIds: {
        type: 'array',
        items: { type: 'integer' },
      },
    },
  }, 
  async ({ userId, fileIds }) => {
    const { UserFile } = rapid.models;

    // get file paths
    const fullPaths = await UserFile.query()
      .select('id', 'path')
      .whereIn('id', fileIds)
      .andWhere('ownerId', userId)
      .map(file => file.fullPath);

    // delete file references in database
    await UserFile.query()
      .delete()
      .whereIn('id', fileIds)
      .andWhere('ownerId', userId);

    // delete actual files on disk
    await del(fullPaths);
  },
);
