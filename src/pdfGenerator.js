const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generateWeeklyAttendancePDF = function(entries, filePath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Titre
      doc.fontSize(18).text("Pointages de la semaine", { align: "center" });
      doc.moveDown();

      // Table header
      doc.fontSize(12).text("Prénom", 50, doc.y, { continued: true });
      doc.text("Nom", 150, doc.y, { continued: true });
      doc.text("Type", 300, doc.y, { continued: true });
      doc.text("Date & Heure", 400, doc.y);
      doc.moveDown();

      // Table content
      entries.forEach(entry => {
        doc.text(entry.first_name, 50, doc.y, { continued: true });
        doc.text(entry.last_name, 150, doc.y, { continued: true });
        doc.text(entry.type, 300, doc.y, { continued: true });
        doc.text(new Date(entry.timestamp).toLocaleString(), 400, doc.y);
        doc.moveDown();
      });

      doc.end();
      stream.on('finish', () => resolve(filePath));
    } catch (err) {
      reject(err);
    }
  });
};
