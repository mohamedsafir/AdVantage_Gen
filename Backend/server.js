require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const imageRoutes = require('./src/routes/imageRoute');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_DB_URI) 
    .then(() => console.log('✅ MongoDB Atlas Connected'))
    .catch(err => console.error('❌ Connection Error:', err));

app.get('/', (req, res) => {
    res.send("AdVantage-GenaAI is working perfectly!" );
});

app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server active on http://localhost:${PORT}`);
    // This adds the specific endpoint URL for your Week 1, 2, and 4 tasks
    console.log(`📡 Endpoint: http://localhost:${PORT}/api/images/generate`);
});