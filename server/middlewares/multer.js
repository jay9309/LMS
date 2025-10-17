import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';
import { ApiError } from '@utils/index';
import { logger } from '@config/index';

// Define the temp directory path
const tempDir = path.join(__dirname, '../../public/temp');

// Ensure the temp directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (_req, _file , cb) => {
        cb(null, tempDir);
    },
    filename: (_req, file, cb) => {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFilename);

        // Log the complete path of the uploaded file
        const filePath = path.join(tempDir, uniqueFilename);
        try {
            logger.info(`File uploaded: ${filePath}`);
        } catch (err) {
            console.error('Logging failed for uploaded file', err);
        }
    },
});

// Allowed file types
const allowedMimetypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
    'text/csv', // .csv
];
const allowedExtensions = ['.jpeg', '.jpg', '.png', '.gif', '.xlsx', '.xls', '.csv', '.pdf'];

// Configure multer for file uploads
const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        const extname = path.extname(file.originalname).toLowerCase();

        if (allowedMimetypes.includes(file.mimetype) && allowedExtensions.includes(extname)) {
            cb(null, true);
        } else {
            logger.error(`File type not allowed: ${file.originalname}`);
            cb(new ApiError(400, 'File type not allowed.'));
        }
    },
    limits: { fileSize: 32 * 1024 * 1024 }, // Limit size to 32 MB
});

export { upload };
