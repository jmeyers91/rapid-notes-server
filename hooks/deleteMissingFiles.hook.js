
module.exports = rapid => {
  return {
    async modelsDidAttach() {
      const path = require('path');
      const { exists } = require('then-fs');
      const { knex } = rapid.database;
      const { UserFile } = rapid.models;
      const publicPath = path.join(__dirname, '../public');

      const filesToDelete = await paginatedIterate(knex, UserFile, 500, async query => {
        const { results : files } = await query;
        const filesToDelete = await Promise.all(files.map(async file => {
          const fullpath = path.join(publicPath, file.path);
          const fileExists = await exists(fullpath);
          return fileExists ? null : file;
        }));

        return filesToDelete.filter(f => !!f);
      });

      const idsToDelete = filesToDelete.map(file => file.id);

      const deletedCount = await UserFile.query().delete().whereIn('id', idsToDelete);
      if(deletedCount > 0) rapid.log(`Deleted ${deletedCount} missing file${deletedCount === 1 ? '' : 's'}.`);
    },
  };
};

async function paginatedIterate(knex, ModelClass, pageSize, fn) {
  const count = await getModelCount(knex, ModelClass);
  pageSize = Math.min(pageSize, count);
  const results = [];
  for(let i = 0; i < count; i += pageSize) {
    const query = ModelClass.query().range(i, i + pageSize - 1);
    results.push(...await fn(query));
  }
  return results;
}

async function getModelCount(knex, ModelClass) {
  return +(await ModelClass.query().select(knex.raw('COUNT(*) as count')))[0].count;
}
