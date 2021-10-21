// I don't think I particularly need this file, since i'll only be having a singular route... Good to have it though.

const api = require('express').Router();

const notesRouter = require('./notes');

// const app = express();

api.use('/notes', notesRouter);

module.exports = api;