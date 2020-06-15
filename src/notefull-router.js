const express = require('express')
const { v4: uuid } = require('uuid')

const notefullRouter = express.Router()
const { notes } = require('./store')
const bodyParser = express.json()
const logger = require('./logger')

notefullRouter
    .route('/')
    .get((req, res) => {
        return res
            .json(notes)
    })
    
      module.exports = bookmarksRouter