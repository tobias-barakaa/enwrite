import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

// Define allowed file types
type AllowedFileExtensions = '.csv' | '.pdf';

// Custom error class for type safety
class FileTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileTypeError';
  }
}

// File filter with proper types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  const ext = path.extname(file.originalname) as AllowedFileExtensions;

  
  if (ext !== '.csv' && ext !== '.pdf') {
    callback(new FileTypeError('Only CSV and PDF files are allowed'));
    return;
  }
  
  callback(null, true);
};

// Storage configuration
const storage = multer({
  storage: multer.diskStorage({}),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export default storage;