const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/game.controller');

router.get('/scores', juegoController.getScores);
router.post('/score', juegoController.updateScore);
router.post('/reset', juegoController.resetScores);

module.exports = router;