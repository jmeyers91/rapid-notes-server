const applyPatch = require('textdiff-patch');

module.exports = rapid => rapid.action(
  'updateNote', 
  {
    type: 'object',
    required: ['noteId', 'title'],
    properties: {
      noteId: {type: 'integer'},
      title: {type: 'string'},
      // Content patch should look like [[1, 3], [-1, 6], [1, 'quick'], [0,10], [1, ' jumps over the lazy dog']]
      contentPatch: {
        type: ['array', 'null'],
        items: {
          type: 'array',
          maxItems: 2,
          items: {
            type: ['integer', 'string']
          }
        }
      }
    }
  }, 
  async ({ noteId, title, contentPatch }) => {
    const { Note } = rapid.models;
    const patch = { title };
    if(contentPatch != null) {
      const note = await Note.query().select('content').where('id', noteId).first();
      if(!note) throw new Error('Invalid note id');
      patch.content = applyPatch(note.content, contentPatch);
    }

    return Note
      .query()
      .patch(patch)
      .where('id', noteId)
      .first();
  }
);
