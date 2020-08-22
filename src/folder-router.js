const express = require('express');
const path = require('path');
const xss = require('xss');
const FolderService = require('./noteful_folder_service');

const folderRouter = express.Router();
const jsonParser = express.json();


// const { notes } = require('./store'); // ?
const bodyParser = express.json();
const logger = require('./logger');

const serializeList = list => ({
    id: list.id,
    listName: xss(list.list_name)
});

folderRouter.route('/')
    .get((req, res, next) => {
        const DB = req.app.get('db')
        console.log('getting folders')

        FolderService.getAllFolders(DB)
            .then(folders => {
                res.json(folders.map((folder) => FolderService.serializeFolder(folder)))
            })
            .then(
                console.log('folders sent')
            )
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const DB = req.app.get('db')
        const {
            name
        } = req.body;
        const newFolder = name;

        console.log('preparing folder');

        for (const [key, value] of Object.entries(newFolder)) {
            if (value == null) {
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                });
            }
        }

        FolderService.createFolder(DB, newFolder)

            .then((folder) => {
                res
                    .status(201)
                    .json(FolderService.serializeFolder(folder));
            })
            .catch(next);





        console.log('folder created and notification sent')
    })
// folderRouter
//     .route('/:folder_id')
//     .all((req, res, next) => {
//         ListService.getListById(
//             req.app.get('db'),
//             req.params.list_id
//         )
//         .then(list => {
//             if (!list) {
//                 return res.status(404).json({
//                     error: { message: `User doesn't exist` }
//                 })
//             }
//             res.list = list
//             next()
//         })
//         .catch(next)
//     })
//     .get((req, res, next) => {
//         res.json(serializeList(res.list))
//     })
//     .delete((req, res, next) => {
//         ListService.deleteList(
//             req.app.get('db'),
//             req.params.list_id
//         )
//         .then(numRowsAffected => {
//             res.status(204).end()
//         })
//         .catch(next)
//     })



module.exports = folderRouter;