import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

console.log("🔧 Configuring Cloudinary with HARDCODED values...");

// ✅ HARDCODED - Direct values (not from .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify it worked
const config = cloudinary.config();
console.log("✅ Cloudinary configured!");
console.log("Cloud Name:", config.cloud_name);
console.log("API Key:", config.api_key);
console.log("API Secret:", config.api_secret ? "✅ Present" : "❌ Missing");

export default cloudinary;
