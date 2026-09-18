import "dotenv/config"

export const ENV = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.MONGO_URI,
    webhook_url: process.env.CLERK_WEBHOOK_SECRET,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    python_service_url: process.env.PYTHON_SERVICE_URL,
    jina_api_key: process.env.JINA_API_KEY,
    qdrant_url: process.env.QDRANT_URL,
    qdrant_api_key: process.env.QDRANT_API_KEY,
    gemini_api_key: process.env.GEMINI_API_KEY,
}
