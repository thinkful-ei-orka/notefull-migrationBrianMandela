const express = require('express');
const path = require('path');
const xss = require('xss');
const ListService = require('./noteful_list_service');

const listsRouter = express.Router();
const jsonParser = express.json();


const { notes } = require('./store');
const bodyParser = express.json();
const logger = require('./logger');

const serializeList = list => ({
    id: list.id,
    listName: xss(list.list_name)
});

listsRouter 
    .route('/')
    .get((req, res, next) => {
        const knexInstance= req.app.get('db')
        ListService.getAllList(knexInstance)
            .then(list => {
                res.json(list.map(serializeList))
            })
            .catch(next);
    })
    .post(jsonParser, (req, res, next) => {
        const { id, list_name };
        const newList = { list_name };

        for (const [key, value] of Object.entries(newList)) {
            if (value == null) {
                return res.status(400).json({
                    error: { mssage: `Missing '${key}' in request body`}
                })
            }
        }

        newList.list_name = list_name

        ListService.createList(
            req.app.get('db'),
            newList
        )
            .then(list => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${list.id}`))
                    .json(serializeList(list))    
            })
            .catch(next)
    })

    listsRouter
        .route('/:list_id')
        .all((req, res, next) => {
            ListService.getListById(
                req.app.get('db'),
                req.params.list_id
            )
            .then(list => {
                if (!list) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.list = list
                next()
            })
            .catch(next)
        })
        .get((req, res, next) => {
            res.json(serializeList(res.list))
        })
        .delete((req, res, next) => {
            ListService.deleteList(
                req.app.get('db'),
                req.params.list_id
            )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
        })

    

module.exports = listsRouter;