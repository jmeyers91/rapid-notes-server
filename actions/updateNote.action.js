// const applyPatch = require('textdiff-patch');
const DiffMatchPatch = require('diff-match-patch');
const diffMatchPatch = new DiffMatchPatch();
let failCount = 1;

module.exports = rapid => rapid.action(
  'updateNote', 
  {
    type: 'object',
    required: ['noteId', 'title'],
    properties: {
      noteId: {type: 'integer'},
      title: {type: 'string'},
      content: {type: 'string'},
      // Content patch should look like [[1, 3], [-1, 6], [1, 'quick'], [0,10], [1, ' jumps over the lazy dog']]
      // contentPatch: {
      //   type: ['array', 'null'],
      //   items: {
      //     type: 'array',
      //     maxItems: 2,
      //     items: {
      //       type: ['integer', 'string']
      //     }
      //   }
      // }
    }
  }, 
  async ({ noteId, title, contentPatch, content }) => {
    const { Note } = rapid.models;
    const patch = { title };

    if(contentPatch != null) {
      const note = await Note.query().select('content').where('id', noteId).first();
      if(!note) throw new Error('Invalid note id');
      
      const [ patchedContent ] = diffMatchPatch.patch_apply(contentPatch, note.content);
      if(patchedContent !== content) {
        console.log('Patch failed!');
        require('fs').writeFile(`../save-fail-${failCount}.json`, JSON.stringify({
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
  }
);
