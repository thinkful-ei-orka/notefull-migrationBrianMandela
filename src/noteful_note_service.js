const NoteService = {


    // R ead
    getAllNotes(knex) {
        return knex
            .select('*')
            .from('notes')
            .then(data => {
                return data;
            }); //

    },

    // C reate
    createNote(knex, noteName, content, modified, list) {
        return knex('notes')
            .insert({
                note_name: `${noteName}`,
                content: `${content}`,
                listId: `${list}`
            });
    },

    // U pdate
    updateNote(knex, noteId, newNoteName, newContent, newListId) {
        return knex('notes')
            .update({
                note_name: `${newNoteName}`,
                content: `${newContent}`,
                listId: `${newListId}`
            })
            .where('id', `${newListId}`)
    },

    getNoteById(knex, id) {
        return knex
            .from('notes')
            .select('*')
            .where('id', `${id}`)
            .first();
    },

    deleteNote(knex, noteId) {
        return knex('notes')
            .del()
            .where('.id', `${noteId}`);
    }

};

module.exports = NoteService;