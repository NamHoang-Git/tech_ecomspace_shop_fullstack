import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (file, options = {}) => {
    const buffer = file?.buffer || Buffer.from(await file.arrayBuffer())

    // Determine resource type based on file mimetype
    const resourceType = file.mimetype.startsWith('video/') ? 'video' : 'image';

    // Default options for upload
    const uploadOptions = {
        folder: "tech_ecomspace_shop",
        resource_type: resourceType,
        // Video-specific optimizations
        ...(resourceType === 'video' ? {
            chunk_size: 6000000, // 6MB chunks for better reliability
            eager: [
                { width: 300, height: 300, crop: "pad", audio_codec: "none" },
                { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }
            ],
            eager_async: true,
            eager_notification_url: "https://your-webhook-url.com/notify_endpoint"
        } : {}),
        ...options
    };

    try {
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        return {
            success: true,
            data: {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
                format: uploadResult.format,
                resource_type: uploadResult.resource_type,
                duration: uploadResult.duration, // For videos
                width: uploadResult.width,
                height: uploadResult.height,
                bytes: uploadResult.bytes
            }
        };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            success: false,
            error: error.message || 'Error uploading file to Cloudinary',
            ...(error.http_code && { statusCode: error.http_code })
        };
    }
};

// Backward compatibility
export const uploadImageCloudinary = async (file) => {
    return uploadToCloudinary(file, { resource_type: 'auto' });
};

export const uploadVideoCloudinary = async (file, options = {}) => {
    return uploadToCloudinary(file, {
        resource_type: 'video',
        ...options
    });
};

export default uploadToCloudinary