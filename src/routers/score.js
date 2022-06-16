const express = require('express');
const { createScore, getScores, getScore, deleteScore, updateScore,getScoreByAuth, getScoreByUser } = require('../controlers/score');
const { checkAuthorized, adminMiddleware } = require('../middleware/index');
const router = express.Router();
//SIGNUP
router.post('/', checkAuthorized, adminMiddleware, createScore);

//GETS
router.get('/', getScores);

//GET
router.get('/:scoreId', getScore);

//GET
router.get('/by/auth/', checkAuthorized, getScoreByAuth);

//GET
router.get('/by/auth/', checkAuthorized, getScoreByUser);

//Update
router.put('/:scoreId', checkAuthorized, updateScore);

//DELETE
router.delete('/:scoreId', checkAuthorized, adminMiddleware, deleteScore);

module.exports = router;
