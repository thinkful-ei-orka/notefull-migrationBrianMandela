const express = require('express');
const path = require('path');
const xss = require('xss');
const NoteService = require('./noteful_note_service');

const noteRouter = express.Router();
const jsonParser = express.json();

// const { notes } = require('./store');
const bodyParser = express.json();
const logger = require('./logger');



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
        console.log('req body here:',req.body)
        const {
            name,
            content,
            modified,
            folderId
        } = req.body;
        NoteService.createNote(DB, name, content, modified, folderId)
            .then(note => {
                res.status(201).json(() => NoteService.serializeNote(note));
            })
            .catch(next);
    });

noteRouter.route('/:note_id')

    .delete((req, res, next) => {
        const DB = req.app.get('db');
        NoteService.deleteNote(DB, req.params.note_id)
            .then(note => {
                res.status(204).end();
            })
            .catch(next);
    });

module.exports = noteRouter;