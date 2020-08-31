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

    getSpecNote(knex, noteId) {
        return knex
            .from('notes')
            .select('*')
            .where('id', `${noteId}`);
    },

    // C reate
    createNote(knex, noteName, content, folderId) {
        return knex('notes')
            .insert({
                note_name: `${noteName}`,
                content: `${content}`,
                list: `${folderId}`
            })
            .returning('*');
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