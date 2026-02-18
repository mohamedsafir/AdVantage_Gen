# 🚀 AdVantage Gen: Automated Social Media Campaign Studio

**AdVantage Gen** is a professional AI-driven platform that automates the creation of social media advertisements. It transforms a simple product idea into a ready-to-publish campaign by instantly generating high-quality images, branding them with your logo, and writing high-conversion marketing copy.

---

## 🛠️ Tech Stack

- **Backend:** Node.js & Express.js
- **AI Engine (Text):** Google Gemini (Prompt Expansion & Copywriting)
- **AI Engine (Image):** Hugging Face (AI Image Generation)
- **Image Processing:** Sharp (Logo Overlay & Branding)
- **Database:** MongoDB Atlas (Persistent Storage)
- **Cloud Storage:** Cloudinary (Image Hosting)

---

## ✨ Features

### 🧠 AI Prompt Expansion (Week 1)
- **Prompt Enhancer:** Automatically expands short user prompts into detailed, cinematic 8k descriptions using Gemini.
- **AI Image Generation:** Generates high-fidelity product images via the Hugging Face Inference API.

### 🎨 Automated Branding & Copy (Week 2)
- **Logo Overlay:** Automatically stamps your brand logo onto the bottom-right corner of every generated image using the Sharp library.
- **Smart Copywriting:** Generates Instagram-ready captions and 5 relevant hashtags in a chosen brand tone (e.g., Witty, Professional).

### 💾 Persistence & Cloud Storage (Week 4)
- **Cloud Upload:** Branded images are instantly uploaded to Cloudinary for stable, high-speed hosting.
- **Database Archiving:** All campaign details (prompts, copy, and image URLs) are saved to MongoDB for easy history retrieval.

---

## 🚀 Installation & Setup

### 1. Prerequisites
- **Node.js** installed on your machine.
- API keys for **Google Gemini**, **Hugging Face**, and **Cloudinary**.
- A **MongoDB Atlas** connection string.

### 2. Environment Configuration
Create a `.env` file in the root directory and add your credentials. **Do not share these keys publicly!**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_ai_key
HF_TOKEN=your_huggingface_token
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

# Install dependencies
```
npm install
```
# Start the server
```
npm start
```
## 📡 API Usage
 
Endpoint: POST /api/images/generate

Request Body Example:
```
JSON
{
  "userPrompt": "A luxury black velvet armchair in a sunlit room",
  "tone": "Professional"
}
```

## 📂 Project Structure
Plaintext
```
backend/
├── src/
│   ├── controllers/    # Request logic & route handlers
│   ├── models/         # MongoDB Schemas & data business logic
│   ├── routes/         # API Endpoint definitions
│   ├── services/       # AI & Third-party service integrations
│   └── utils/          # Image processing & general helpers
└── .env      
└── server.js
└── package.json          
```

## 🛠️ How to Add This to Your Project
Open VS Code and navigate to your project's main folder.

Create a new file named exactly README.md (case sensitive).

Paste the code above into the file.

Save the file. You can use Ctrl + Shift + V in VS Code for a live preview.