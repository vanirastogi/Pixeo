import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Absolute path for uploads
const uploadDir = path.join(process.cwd(), 'uploads');

// Ensure the folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // always absolute
  },
  filename: (req, file, cb) => {
    const uniqueName =
      file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

export const upload = multer({ storage });
