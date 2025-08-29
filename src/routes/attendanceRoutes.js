const express = require('express');
const axios = require('axios');
const base64 = require('base-64'); // Pour encoder le mot de passe en Base64
const router = express.Router();
const controller = require('../controllers/attendanceController');

router.post('/attendance', controller.addEntry);
router.get('/attendance', controller.getEntries);
router.get('/attendance/today', controller.getTodayEntries);

// Endpoint pour vérifier si l'utilisateur est sur le Wi-Fi d'ECOIA
router.get('/check-wifi', async (req, res) => {
  try {
    // Étape 1 : Récupérer le token CSRF
    const tokenResponse = await axios.get('http://192.168.100.1/asp/GetRandCount.asp', {
      timeout: 5000,
    });
    const csrfToken = tokenResponse.data.trim(); // Le token est renvoyé comme texte brut

    // Étape 2 : Préparer les données du formulaire
    const username = 'root';
    const password = 'WC4YbxV2';
    const encodedPassword = base64.encode(password); // Encoder en Base64
    const formData = new URLSearchParams();
    formData.append('UserName', username);
    formData.append('PassWord', encodedPassword);
    formData.append('Language', 'english');
    formData.append('x.X_HW_Token', csrfToken);

    // Étape 3 : Soumettre le formulaire
    const loginResponse = await axios.post('http://192.168.100.1/login.cgi', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'body:Language:english:id=-1;path=/', // Cookie requis par le routeur
      },
      timeout: 5000,
      maxRedirects: 0, // Ne pas suivre les redirections pour vérifier le code HTTP
    });

    // Étape 4 : Vérifier si l'authentification a réussi
    // Une réponse 302 (redirection) ou 200 indique souvent un succès
    if (loginResponse.status === 200 || loginResponse.status === 302) {
      res.json({ isValid: true });
    } else {
      res.json({ isValid: false });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification Wi-Fi:', error.message);
    res.json({ isValid: false }); // Échec si timeout, erreur réseau, ou mauvaise réponse
  }
});
module.exports = router;
