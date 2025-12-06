const db = require('../database/bd');

const juegoController = {
  // Obtener scores
  getScores: async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM scores ORDER BY player');
      const scores = {};
      rows.forEach(row => {
        scores[row.player] = row.wins;
      });
      res.json(scores);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Actualizar score del ganador
  updateScore: async (req, res) => {
    const { winner } = req.body;
    
    if (!winner || (winner !== 'X' && winner !== 'O')) {
      return res.status(400).json({ error: 'Ganador inválido' });
    }

    try {
      const [result] = await db.query(
        'UPDATE scores SET wins = wins + 1 WHERE player = ?',
        [winner]
      );
      res.json({ success: true, winner, rowsAffected: result.affectedRows });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Resetear scores
  resetScores: async (req, res) => {
    try {
      await db.query('UPDATE scores SET wins = 0');
      res.json({ success: true, message: 'Scores reseteados' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = juegoController;

