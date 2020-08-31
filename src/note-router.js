const express = require('express');
const path = require('path');
const xss = require('xss');
const NoteService = require('./noteful_note_service');

const noteRouter = express.Router();
const jsonParser = express.json();

// const { notes } = require('./store');
const bodyParser = express.json();
const logger = require('./logger');
const { serializeNote } = require('./noteful_note_service');



noteRouter.route('/')
    .get((req, res, next) => {
        const DB = req.app.get('db')
        NoteService.getAllNotes(DB)
            .then(notes => {
                res.json(notes.map((note) => NoteService.serializeNote(note)));
            })
            .catch(next);
    })

    .post(jsonParser, (req, res, next) => {
        const DB = req.app.get('db');
        const {
            name,
            content,
            folderId
        } = req.body;

        const noteInfo = {
            name,
            content,
            folderId
        }
        // double check for note info to enter with a for of each req body param
        for (const [key, value] of Object.entries(noteInfo)) {
            if (value == null) {
                return res.status(400).json({error: `Missing '${key}' in request body`});
            }
        }
        NoteService.createNote(DB, name, content, folderId)
            .then(note => {
                res.status(200).json(NoteService.serializeNote(note[0]));
            })
            .catch(next);
    });

noteRouter.route('/:note_id')
    .get((req, res, next) => {
        const DB = req.app.get('db');
        NoteService.getSpecNote(
            DB,
            req.params.note_id
        )
        .then( note => {
            if (note.length === 0 ) {
                console.log('Sending note not found error');
                res.status(404).json({error: `Note not found`})
            }
            else {
            res.status(200).json(NoteService.serializeNote(note[0]))
            }
        })
        .catch(next);
    })

    .delete((req, res, next) => {
        const DB = req.app.get('db');
        NoteService.deleteNote(DB, req.params.note_id)
            .then(note => {
                console.log('plain data from service:', note);
                console.log('first position in data from service:', note[0]);
                if (note === 1) {
                    res.status(204).end();
                }
                else {
                    res.status(404).json({error: `Note with ID: ${req.params.note_id} does not exist`})
                }
            })
            .catch(next);
    });

module.exports = noteRouter;