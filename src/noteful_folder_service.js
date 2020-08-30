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
            })
            .returning('*');
    },


    // deleteSpecFolder(),

    serializeFolder(folder) {
        return {
            id: folder.id,
            name: folder.list_name,
        };
    }
};

module.exports = FolderService;