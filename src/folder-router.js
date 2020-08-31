const express = require('express');
const path = require('path');
const xss = require('xss');
const FolderService = require('./noteful_folder_service');
const NoteService = require('./noteful_note_service');

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
        const DB = req.app.get('db');

        FolderService.getAllFolders(DB)
            .then(folders => {
                res.json(folders.map((folder) => FolderService.serializeFolder(folder)))
            })
            .then(
            )
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const DB = req.app.get('db')
        const {
            name
        } = req.body;
        console.log('req body from POST folder:', req.body);
        const newFolder = name;

        console.log('Preping folder with name:', newFolder);

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
                let folderForClient = FolderService.serializeFolder(folder[0]);
                res
                    .status(200)
                    .json(folderForClient);
            })
            .catch(next);





        console.log('folder created and notification sent')
    });

folderRouter.route('/:folder_id')
    .get((req, res, next) => {
        const DB = req.app.get('db');
        console.log('folder id to reference:',req.params.folder_id);
        NoteService.getFolderNotes(
            DB,
            req.params.folder_id
        )
        .then(notes => {
            console.log('data from getFolderNotes service', notes);
            if (notes.length === 0 ) {
                console.log('Sending notes not found error');
                res.status(404).json({error: `Notes do not exist for folder`})
            }
            else {
            res.status(200).json(notes.map((note) => NoteService.serializeNote(note)))
            }
        })
        .catch(next);
    })
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
        // .catch(next)
    // })



module.exports = folderRouter;