const connection = require('../db');

// Ajouter un pointage
exports.addEntry = (req, res) => {
  const { firstName, lastName, type } = req.body;

  if (!firstName || !lastName || !type) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  const timestamp = new Date();
  const sql = 'INSERT INTO attendance (first_name, last_name, type, timestamp) VALUES (?, ?, ?, ?)';
  connection.query(sql, [firstName, lastName, type, timestamp], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de l’enregistrement du pointage' });
    }
    res.json({ id: results.insertId, firstName, lastName, type, timestamp });
  });
};

// Récupérer les derniers pointages
exports.getEntries = (req, res) => {
  const sql = 'SELECT * FROM attendance ORDER BY timestamp DESC LIMIT 20';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des pointages' });
    }
    res.json(results);
  });
};

exports.getTodayEntries = (req, res) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateString = `${yyyy}-${mm}-${dd}`;

  const sql = 'SELECT * FROM attendance WHERE DATE(timestamp) = ? ORDER BY timestamp DESC';
  connection.query(sql, [dateString], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des pointages du jour' });
    res.json(results);
  });
};

exports.getWeeklyEntries = function(callback) {
  const sql = `
    SELECT * FROM attendance
    WHERE YEARWEEK(timestamp, 1) = YEARWEEK(CURDATE(), 1)
    ORDER BY timestamp ASC
  `;
  connection.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
