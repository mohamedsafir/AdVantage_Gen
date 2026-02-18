const aiService = require('../services/aiService');
const { applyBranding } = require('../utils/imageProcessor');
const Campaign = require('../models/Campaign');
const { uploadImage } = require('../utils/cloudinary');

const createCampaignImage = async (req, res) => {
    try {
        const { userPrompt, tone = "Professional" } = req.body;

        if (!userPrompt) {
            return res.status(400).json({ error: "Please provide a userPrompt" });
        }

        // 1. Expand the user's simple prompt using Gemini
        console.log("Step 1: Expanding prompt with Gemini...");
        const detailedPrompt = await aiService.expandPrompt(userPrompt);

        // 2. Parallel Generation: Generate Image and Ad Copy concurrently
        console.log("Step 2: Generating image and ad copy concurrently...");
        const [rawImageData, adCopy] = await Promise.all([
            aiService.generateImageFromHF(detailedPrompt),
            aiService.generateAdCopy(userPrompt, tone)
        ]);

        // 3. Apply Branding: Overlay the logo onto the AI image
        console.log("Step 3: Applying brand logo with Sharp...");
        const brandedImageBuffer = await applyBranding(rawImageData);

        // --- WEEK 4 ADDITIONS START HERE ---

        // 4. Upload the branded image to Cloudinary (Persistence)
        console.log("Step 4: Uploading branded image to Cloudinary...");
        const cloudinaryUrl = await uploadImage(brandedImageBuffer);

        // 5. Save the complete ad campaign to MongoDB
        console.log("Step 5: Saving campaign to database...");
        const newCampaign = await Campaign.create({
            userPrompt,
            detailedPrompt,
            caption: adCopy.caption,
            hashtags: adCopy.hashtags,
            tone,
            imageUrl: cloudinaryUrl // Save the URL instead of a giant Base64 string
        });

        // 6. Send JSON response (Returning the saved database object)
        console.log("Step 6: Campaign saved and sent successfully!");
        res.json(newCampaign);

    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCampaignImage };