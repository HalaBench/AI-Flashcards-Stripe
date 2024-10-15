import formidable from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle multipart form data
  },
};

export  async function POST(req) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({
      uploadDir: './uploads',
      keepExtensions: true,
    });

    // Parse the incoming form and extract the PDF file
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing file' });
      }

      const pdfPath = files.pdf.filepath;

      try {
        // Read the file from the filesystem
        const fileStream = fs.createReadStream(pdfPath);

        // Create a FormData object to send the PDF file to the Flask API
        const formData = new FormData();
        formData.append('pdf', fileStream, path.basename(pdfPath));

        // Send the PDF to the Flask API for processing
        const flaskRes = await fetch('http://localhost:5000/process-pdf', {
          method: 'POST',
          body: formData,
        });

        if (!flaskRes.ok) {
          throw new Error('Error processing PDF');
        }

        const flaskData = await flaskRes.json();

        // Return the extracted text or flashcards
        return res.status(200).json({ text: flaskData.text });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error processing PDF' });
      }
    });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
