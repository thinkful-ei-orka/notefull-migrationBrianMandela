const NoteService = {


    // R ead
    getAllNotes(knex) {
        return knex
            .from('notes')
            .select('*')
            // .then(data => {
            //     return data;
            // });
    },

    getFolderNotes(knex, folderId) {
        return knex
            .from('notes')
            .select('*')
            .where('list', `${folderId}`)
    },

    // C reate
    createNote(knex, noteName, content, modified, list) {
        return knex('notes')
            .insert({
                note_name: `${noteName}`,
                content: `${content}`,
                list: `${list}`
            });
    },

    // D elete
    deleteNote(knex, noteId) {
        return knex('notes')
            .del()
            .where('id', `${noteId}`);
    },

    serializeNote(note) {
        return {
            id: note.id,
            name: note.note_name,
            content: note.content,
            modified: note.modified,
            folderId: note.list
        };
    }

};

module.exports = NoteService;