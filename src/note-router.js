const express = require('express');
const path = require('path');
const xss = require('xss');
const NoteService = require('./noteful_note_service');

const noteRouter = express.Router();
const jsonParser = express.json();

const { notes } = require('./store')
const bodyParser = express.json()
const logger = require('./logger')

const serializeNote = note => ({
    id: note.id,
    noteName: xss(note.note_name),
    content: xss(note.content),
    modified: xss(note.modified),
    list: xss(note.list)
});

noteRouter
    .route('/')
    .get((req, res) => {
        return res
            .json(notes);
    });
    
module.exports = noteRouter;