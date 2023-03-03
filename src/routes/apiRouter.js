const express = require('express');
const apiRouter = express.Router();

// data
const users = require("../config/users.json");
const questions = require("../config/questions.json")

// helpers
const calculate = require('../helpers/calculateLeaderboard.js')


apiRouter.get('/leaderboard', (req, res) => {
    return res.status(200).json(calculate(users))
})

apiRouter.get('/questions', (req, res) => {
    return res.status(200).json(questions)
})

apiRouter.get('/questions/random', (req, res) => {
    let randomIdx = Math.floor(Math.random() * questions.length);
    res.status(200).json(questions[randomIdx])
})

apiRouter.get('/questions/:id', (req, res) => {
    const { id } = req.params;
    let question = questions.find(question => question.id == id);

    if(question) return res.status(200).json(question)
    else return res.status(404).json({ error: "question id not found" })
})

module.exports = apiRouter;