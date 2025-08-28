// mailSender.js
const nodemailer = require("nodemailer");
const fs = require("fs");

exports.sendWeeklyAttendanceMail = async function (email, pdfPath) {
  // 1. Config transport SMTP
  let transporter = nodemailer.createTransport({
    service: "gmail", // ou autre service (Outlook, Yahoo, etc.)
    auth: {
      user: process.env.MAIL_USER, // ton adresse mail
      pass: process.env.MAIL_PASS, // ton mot de passe ou App Password
    },
  });

  // 2. Préparer et envoyer le mail
  let info = await transporter.sendMail({
    from: `"Ecoia Attendance" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Pointages de la semaine 📊",
    text: "Bonjour,\n\nVeuillez trouver ci-joint le PDF contenant la liste des pointages de la semaine.\n\nBonne lecture !",
    attachments: [
      {
        filename: "weekly_attendance.pdf",
        content: fs.createReadStream(pdfPath),
      },
    ],
  });

  console.log("✅ Mail envoyé:", info.messageId);
  return info;
};
