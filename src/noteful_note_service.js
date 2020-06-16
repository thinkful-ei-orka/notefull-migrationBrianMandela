const NoteService= {

    getAllNotes(knex) {
        return knex
                .select('*')
                .from('notes')

    },

    createNote(knex) {
        
    },


    deleteNote(knex) {

    }

}