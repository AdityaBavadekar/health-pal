import multer from "multer";

// Store in memory for S3 upload
const storage = multer.memoryStorage();

const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "text/plain",
];

const upload = multer({
    storage,
    limits: {
        fileSize: 15 * 1024 * 1024, // 15MB max
    },
    fileFilter: (req, file, cb) => {
        if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, PNG, JPEG, and TXT files are allowed!"), false);
        }
    },
});

export default upload;
