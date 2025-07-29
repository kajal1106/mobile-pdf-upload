import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/sign-pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');

    // Read the uploaded PDF file
    const existingPdfBytes = fs.readFileSync(req.file.path);

    // Load the PDF with pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed a font for the watermark
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Add watermark text to every page
    const pages = pdfDoc.getPages();
    for (const page of pages) {
      const { width, height } = page.getSize();

      page.drawText('Signed by Delta Capita', {
        x: width / 2 - 120, // center-ish
        y: height / 2, // middle of page
        size: 30,
        font,
        color: rgb(0.8, 0.1, 0.1),
        opacity: 0.4,
        rotate: degrees(45),
      });
    }

    // Save the modified PDF
    const signedPdfBytes = await pdfDoc.save();

    // Send it back
    res.setHeader('Content-Disposition', 'attachment; filename="signed.pdf"');
    res.contentType("application/pdf");
    res.send(Buffer.from(signedPdfBytes));
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send('Signing failed');
  }
});

app.listen(3001, () => {
  console.log('✅ Mock server running at http://localhost:3001');
});
