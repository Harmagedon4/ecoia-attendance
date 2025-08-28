const cron = require('node-cron');
const { sendWeeklyReport } = require('./weeklyMailer');

// Chaque samedi à 23h59
cron.schedule('59 23 * * 6', () => {
  sendWeeklyReport('stellagbaguidi68@gmail.com');
  console.log("Lancement envoi PDF hebdo :", new Date());
});
