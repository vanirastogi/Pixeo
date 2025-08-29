import multer from 'multer';
import path from 'path'; // It's good practice to use this for file extensions

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder where files will be saved
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    // Create a unique filename to prevent overwriting
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });