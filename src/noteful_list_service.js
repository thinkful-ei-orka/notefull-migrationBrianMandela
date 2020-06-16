/* eslint-disable indent */
const ListService = {
    // R ead
    getAllList(knex) {
        return knex
            .select('*')
            .from('lists')
            .then(data => {
                return data;
            });
    },

    // C reate
    createList(knex, listName) {
        return knex('lists')
            .insert({list_name: `${listName}`});
            // ^^what confirmation can we receive from insertion to relay as part of service
            // .on('query-repsonse', function(res obj, builder))
            // .on('query-error', function(res, obj, builder))
    },

    // U pdate
    udpateListName(knex, listId, newListName) {
        return knex('lists')
            .update({listname: `${newListName}`})
            .where('id',`${listId}`);
            // .on('query-repsonse', function(res obj, builder))
            // .on('query-error', function(res, obj, builder))
    },
    
    // Delete
    delete(knex, listId) {
        return knex('lists')
            .del()
            .where('.id',`${listId}`);
            // .on('query-repsonse', function(res obj, builder))
            // .on('query-error', function(res, obj, builder))
    }
};


module.exports = ListService;