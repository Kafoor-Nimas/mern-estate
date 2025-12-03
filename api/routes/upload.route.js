import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// ✅ Configure multer to store files in memory (temporary)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit per file
  },
  fileFilter: (req, file, cb) => {
    // Only accept images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// ✅ POST route to upload multiple images
router.post("/images", upload.array("images", 6), async (req, res) => {
  try {
    // ✅ ADD: Debug logging
    console.log("📸 Upload request received");
    console.log("Files count:", req.files?.length);
    console.log("Cloudinary config:", {
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key,
      api_secret: cloudinary.config().api_secret ? "✅ Present" : "❌ Missing",
    });

    const files = req.files;

    // Check if files exist
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    console.log("📤 Starting upload to Cloudinary...");

    // ✅ Upload each file to Cloudinary
    const uploadPromises = files.map((file, index) => {
      return new Promise((resolve, reject) => {
        console.log(`Uploading file ${index + 1}/${files.length}...`);

        // Create upload stream
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "real-estate-listings",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              console.error(`❌ Upload failed for file ${index + 1}:`, error);
              reject(error);
            } else {
              console.log(`✅ Upload successful for file ${index + 1}`);
              resolve(result.secure_url);
            }
          }
        );

        // Send file buffer to Cloudinary
        uploadStream.end(file.buffer);
      });
    });

    // Wait for all uploads to complete
    const urls = await Promise.all(uploadPromises);

    console.log("🎉 All uploads completed:", urls);

    // ✅ Return success response with image URLs
    res.status(200).json({
      success: true,
      urls: urls,
      message: "Images uploaded successfully",
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
});

export default router;
