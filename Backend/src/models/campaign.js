const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    userPrompt: { type: String, required: true },
    detailedPrompt: String,
    caption: String,
    hashtags: String,
    imageUrl: String,
    tone: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', CampaignSchema);