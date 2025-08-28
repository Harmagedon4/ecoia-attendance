// src/weeklyMailer.js
const { getWeeklyEntries } = require('./controllers/attendanceController.js');
const { generateWeeklyAttendancePDF } = require('./pdfGenerator.js');
const { sendWeeklyAttendanceMail } = require('./mailSender.js');
const os = require('os');
const path = require('path');

exports.sendWeeklyReport = function(email) {
  getWeeklyEntries(async (err, entries) => {
    if (err) {
      console.error("❌ Erreur récupération pointages :", err);
      return;
    }

    // Sauvegarde du PDF dans le dossier temporaire du système
    const pdfPath = path.join(os.tmpdir(), 'weekly_attendance.pdf');

    try {
      await generateWeeklyAttendancePDF(entries, pdfPath);
      const res = await sendWeeklyAttendanceMail(email, pdfPath);
      console.log("✅ Mail envoyé :", res);
    } catch (err) {
      console.error("❌ Erreur génération/envoi PDF :", err);
    }
  });
};
