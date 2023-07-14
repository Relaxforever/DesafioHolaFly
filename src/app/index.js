const db = require('./db');
const swapiFunctions = require('./swapiFunctions')
const peopleFactory = require("./People");
const planet = require("./Planet");

module.exports = {
    db,
    planet,
    peopleFactory,
    swapiFunctions,
}