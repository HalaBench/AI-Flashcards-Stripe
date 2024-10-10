import formidable from 'formidable';
import fs from 'fs/promises';
import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = async (req) => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve(files.pdf.filepath);
    });
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const pdfPath = await readFile(req);
      const pdfBuffer = await fs.readFile(pdfPath);
      const pdfData = await pdfParse(pdfBuffer);
      res.status(200).json({ text: pdfData.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing PDF' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
