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

folderRouter 
    .route('/')
    .get((req, res, next) => {
        console.log('getting folders')
        const knexInstance= req.app.get('db')
        FolderService.getAllFolders(knexInstance)
            .then(folders => {
                res.json(folders.map(serializeFolders))
            })
            .then(
                console.log('folders sent')
                )
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        // const { id, folder_name };
        const newFolder = req.folder_name ;

        console.log('preparing folder');

        for (const [key, value] of Object.entries(newFolder)) {
            if (value == null) {
                return res.status(400).json({
                    error: { mssage: `Missing '${key}' in request body`}
                })
            }
        }

        console.log('folder created and notification sent')
    })

    .delete(jsonParser, (req, res, next) => {
        // const { id, folder_name };
        const newFolder = req.folder_name;

        for (const [key, value] of Object.entries(newFolder)) {
            if (value == null) {
                return res.status(400).json({
                    error: { mssage: `Missing '${key}' in request body`}
                })
            }
        }
        

        FolderService.createList(
            req.app.get('db'),
            newFolder
        )
            .then(list => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${folder.id}`))
                    .json(serializeFolder(folder))    
            })
            .catch(next)
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