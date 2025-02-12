// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Define the root and upload directories
// const rootDir = path.resolve(__dirname, "../");
// const uploadDirectory = path.join(rootDir, "uploads");

// // Helper function to create directories if they don't exist
// const createDirectoryIfNotExists = (dirPath) => {
//     if (!fs.existsSync(dirPath)) {
//         fs.mkdirSync(dirPath, { recursive: true });
//     }
// };

// // Ensure the base upload directory exists
// createDirectoryIfNotExists(uploadDirectory);

// // Folder mapping for field names
// const folderMapping = {
//     "necklace_photo": "necklace_photos",
//     "pendant_photo": "pendant_photos",
//     "choker_photo": "choker_photos",
//     "earring_photo": "earring_photos",
//     "bracelet_photo": "bracelet_photos",
//     "ring_photo": "ring_photos",
//     "brooch_photo": "brooch_photos",
//     "set_photo": "set_photos",
//     "collection_photo": "collection_photos",
//     "user_photo": "user_photos",
//     "file": "pdf_files",
//     "profilePicture": "profile_pictures", // Added for profile pictures
// };

// // Multer storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const folder = folderMapping[file.fieldname] || "misc";
//         const uploadPath = path.join(uploadDirectory, folder);
//         createDirectoryIfNotExists(uploadPath);
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//         const ext = path.extname(file.originalname).toLowerCase();
//         cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//     },
// });

// // File filter to validate file types
// const fileFilter = (req, file, cb) => {
//     const allowedMimeTypes = {
//         "necklace_photo": /image\/(jpeg|jpg|png)/,
//         "pendant_photo": /image\/(jpeg|jpg|png)/,
//         "choker_photo": /image\/(jpeg|jpg|png)/,
//         "earring_photo": /image\/(jpeg|jpg|png)/,
//         "bracelet_photo": /image\/(jpeg|jpg|png)/,
//         "ring_photo": /image\/(jpeg|jpg|png)/,
//         "brooch_photo": /image\/(jpeg|jpg|png)/,
//         "set_photo": /image\/(jpeg|jpg|png)/,
//         "collection_photo": /image\/(jpeg|jpg|png)/,
//         "user_photo": /image\/(jpeg|jpg|png)/,
//         "profilePicture": /image\/(jpeg|jpg|png)/, // Added for profile pictures
//         "file": /application\/pdf/,
//     };

//     const allowedMimeType = allowedMimeTypes[file.fieldname];
//     if (allowedMimeType && allowedMimeType.test(file.mimetype)) {
//         cb(null, true); // Valid file
//     } else {
//         cb(new Error(`Invalid file type for ${file.fieldname}`));
//     }
// };

// // Multer configurations
// const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
// }).fields([
//     { name: "necklace_photo", maxCount: 1 },
//     { name: "pendant_photo", maxCount: 1 },
//     { name: "choker_photo", maxCount: 1 },
//     { name: "earring_photo", maxCount: 1 },
//     { name: "bracelet_photo", maxCount: 1 },
//     { name: "ring_photo", maxCount: 1 },
//     { name: "brooch_photo", maxCount: 1 },
//     { name: "set_photo", maxCount: 1 },
//     { name: "collection_photo", maxCount: 1 },
//     { name: "user_photo", maxCount: 1 },
//     { name: "profilePicture", maxCount: 1 }, // Added for profile pictures
//     { name: "file", maxCount: 1 },
// ]);

// module.exports = { upload };