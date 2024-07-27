const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

async function processImage(image, SERVER_ORIGINAL_URL) {
    console.log(`Processing image: ${JSON.stringify(image, null, 2)}`);
    return {
        response: {
            result: {
                image_id: uuidv4(),
                variants: [
                    await optimizeImage(image.filename, SERVER_ORIGINAL_URL),
                    await BlurImage(image.filename, SERVER_ORIGINAL_URL)
                ]
            }
        }
    };
}

async function processVideo(video, SERVER_ORIGINAL_URL) {
    return {
        video_id: uuidv4(),
        video_url: `${SERVER_ORIGINAL_URL}/posts/uploads/${video.filename}`,
        poster: `${SERVER_ORIGINAL_URL}/posts/uploads/${video.filename}`
    };
}

async function BlurImage(imagePath, SERVER_ORIGINAL_URL) {
    sharp(path.join(__dirname, '../', 'public', `/posts/uploads/${imagePath}`))
        .blur(15)
        .toFile(path.join(__dirname, '../', 'public', 'posts/blur', imagePath), (err, info) => {
            if (err) {
                console.error(`Failed to blur image: ${err.message} `);
            }
        });
    return `${SERVER_ORIGINAL_URL}/posts/blur/${imagePath} `
}

async function optimizeImage(imagePath, SERVER_ORIGINAL_URL) {
    sharp(path.join(__dirname, '../', 'public', `/posts/uploads/${imagePath}`))
        .resize(900)
        .toFile(path.join(__dirname, '../', 'public', 'posts/converted', imagePath), (err, info) => {
            if (err) {
                console.error(`Failed to optimize image: ${err.message} `);
            }
        });
    return `${SERVER_ORIGINAL_URL}/posts/converted/${imagePath} `
}

async function HandleMedia(files, req, validVideoMimetypes, SERVER_ORIGINAL_URL) {
    try {
        const images = [];
        const videos = [];

        for (let file of files) {
            if (validVideoMimetypes.includes(file.mimetype)) {
                videos.push(file);
            } else if (file.mimetype.includes("image")) {
                images.push(file);
            }
        }

        const imagePromises = images.map(image => processImage(image, SERVER_ORIGINAL_URL));
        const videoPromises = videos.map(video => processVideo(video, SERVER_ORIGINAL_URL));

        const processedImages = await Promise.all(imagePromises);
        const processedVideos = await Promise.all(videoPromises);

        const media = { images: [...processedImages], videos: [...processedVideos] }
        console.log(`Processed media: ${JSON.stringify(media)} `);
        return media;
    } catch (error) {
        console.error(`Error processing media: ${error.message} `);
        return Promise.reject(error);
    }
}

module.exports = HandleMedia;
