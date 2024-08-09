const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

// Use memory storage to handle the file buffers
const storage = multer.memoryStorage();

const processImage = async (file) => {
    return new Promise((resolve, reject) => {
        const uniqueSuffix = uuidv4(); // Generate unique suffix
        const newFilename = uniqueSuffix + '.webp';
        const outputPath = path.join("public/story/", newFilename);

        sharp(file.buffer)
            .resize({ width: 1000 })
            .toFormat('webp')
            .toFile(outputPath, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newFilename);
                }
            });
    });
};

const createUploadHandler = (fieldName) => {
    const upload = multer({ storage: storage }).array(fieldName); // Use dynamic field name

    return async (req, res, next) => {
        upload(req, res, async (err) => {
            if (err) {
                return next(err); // Handle multer errors
            }
            try {
                if (req.files && req.files.length > 0) {
                    const fileProcessingPromises = req.files.map(async (file) => {
                        if (file.mimetype.startsWith('image')) {
                            const newFilename = await processImage(file);
                            return { ...file, filename: newFilename };
                        } else {
                            const uniqueSuffix = uuidv4(); // Generate unique suffix
                            const newFilename = uniqueSuffix + path.extname(file.originalname);
                            fs.writeFileSync(path.join("public/story/", uniqueSuffix + path.extname(file.originalname)), file.buffer);
                            return { ...file, filename: newFilename };
                        }
                    });

                    // Process all files
                    const processedFiles = await Promise.all(fileProcessingPromises);
                    req.files = processedFiles; // Replace req.files with processed files
                }
                next(); // Continue to the next middleware
            } catch (error) {
                next(error); // Handle sharp errors
            }
        });
    };
};

module.exports = createUploadHandler;
