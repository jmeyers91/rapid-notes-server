
const { writeFile } = require('fs');
const DiffMatchPatch = require('diff-match-patch');
const diffMatchPatch = new DiffMatchPatch();
let failCount = 1;

module.exports = rapid => rapid.action(
  'updateNote', 
  {
    type: 'object',
    required: [ 'noteId', 'title' ],
    properties: {
      noteId: { type: 'integer' },
      title: { type: 'string' },
      revision: { type: 'integer' },
      content: { type: ['string', 'null'] },
    },
  }, 
  async ({ noteId, title, revision, contentPatch, content }) => {
    const { Note } = rapid.models;
    const note = await Note.query().select('content').where('id', noteId).first();
    if(!note) throw new Error('Invalid note id');
    if(revision < note.revision) {
      rapid.log('Detected out-of-order save. Ignoring.');
      return note;
    }
    const patch = { title, revision };

    if(contentPatch != null) {
      const [ patchedContent ] = diffMatchPatch.patch_apply(contentPatch, note.content);
      if(typeof content === 'string' && patchedContent !== content) {
        rapid.log('Patch failed!');
        writeFile(`../save-fail-${failCount}.json`, JSON.stringify({
          content,
          patchedContent,
          contentPatch,
        }, null, 2));
        failCount++;
        patch.content = content;
      } else {
        patch.content = patchedContent;
      }
    }

    return Note
      .query()
      .patch(patch)
      .where('id', noteId)
      .first();
  },
);
