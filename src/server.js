// src/index.js
const express = require('express');
const cors = require('cors');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

// Middlewares
app.use(cors()); // Autorise toutes les origines
app.use(express.json());

// Routes
app.use('/api', attendanceRoutes);

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Import du cron (pour déclencher l’envoi automatique d’email chaque semaine)
require('./cron');
