module.exports = rapid => {
  const path = require('path');
  const busboy = require('koa-busboy');
  const uuid = require('uuid/v4');
  const makeDir = require('make-dir');  
  const { middleware, actions } = rapid;
  const { auth } = middleware;

  const publicPath = path.join(__dirname, '../public')
  const uploadPath = path.join(publicPath, 'uploads');
  makeDir.sync(uploadPath);

  const uploader = busboy({
    dest: uploadPath,
    fnDestFilename: (fieldname, filename) => `${uuid()}___${filename}`,
  });

  function getUploadFilePath(file) {
    return path.relative(publicPath, file.path);
  }

  rapid.api.post(
    '/upload',
    auth(),
    uploader,
    async context => {
      const { files } = context.request;
      const userId = context.state.user.id;

      const fileModels = await actions.addUserFiles({
        userId,
        files: files.map(file => {
          return {
            path: getUploadFilePath(file),
            mimetype: file.mimetype,
          }
        }),
      });

      context.response.status = 200;
      context.response.body = { files: fileModels };
    },
  );
};
