const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const expandPrompt = async (userPrompt) => {
    try {
        const instruction = `You are a professional AI prompt engineer. 
        Enhance this simple request into a detailed, cinematic image generation prompt: "${userPrompt}". 
        Focus on lighting, artistic style (e.g., photorealistic, 8k), and composition. 
        Return ONLY the enhanced prompt text without quotes.`;

        const result = await model.generateContent(instruction);
        return result.response.text();
    } catch (error) {
        throw new Error("Gemini Prompt Expansion Failed: " + error.message);
    }
};

const generateAdCopy = async (prompt, tone) => {
    try {
        const result = await model.generateContent(`Write a ${tone} social media ad caption and 5 hashtags for: ${prompt}`);
        const text = result.response.text();

        const parts = text.split('#');
        return {
            caption: parts[0].trim(),
            hashtags: parts.length > 1 ? '#' + parts.slice(1).join('#').trim() : "#AdVantageGen"
        };
    } catch (error) {
        throw new Error("Gemini Ad Copy Failed: " + error.message);
    }
};

const generateImageFromHF = async (expandedPrompt) => {
    try {
        const response = await axios({
            // NEW ROUTER URL
            url: "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.HF_TOKEN}`,
                Accept: 'image/png',
            },
            data: { inputs: expandedPrompt },
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (error) {
        // Detailed error logging to catch if the model is also deprecated
        console.error("HF Details:", error.response?.data?.toString() || error.message);
        throw new Error("Hugging Face Generation Failed: " + error.message);
    }
};

module.exports = { expandPrompt, generateAdCopy, generateImageFromHF };