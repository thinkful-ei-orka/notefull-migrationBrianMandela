/* eslint-disable indent */
const FolderService = {
    // R ead
    getAllFolders(knex) {
        return knex
            .from('lists')
            .select('*');
    },

    // C reate
    createFolder(knex, folderName) {
        return knex('lists')
            .insert({
                list_name: `${folderName}`
            });
            // .then(data => {
            //     return data;
            // });
        // ^^what confirmation can we receive from insertion to relay as part of service
        // .on('query-repsonse', function(res obj, builder))
        // .on('query-error', function(res, obj, builder))
    },

    serializeFolder(folder) {
        return {
            id: folder.id,
            name: folder.list_name,
        };
    }
};

module.exports = FolderService;