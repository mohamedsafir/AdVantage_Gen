const sharp = require('sharp');
const path = require('path');

const applyBranding = async (imageBuffer) => {
    try {
        const logoPath = path.join(__dirname, '../../assets/logo/logo.png');
        const metadata = await sharp(imageBuffer).metadata();

        // Resize logo to be 15% of the main image width
        const logoWidth = Math.floor(metadata.width * 0.15);
        const resizedLogo = await sharp(logoPath)
            .resize({ width: logoWidth })
            .toBuffer();

        // Overlay logo at the bottom-right (southeast)
        return await sharp(imageBuffer)
            .composite([{
                input: resizedLogo,
                gravity: 'southeast',
                blend: 'over'
            }])
            .toBuffer();
    } catch (error) {
        throw new Error("Branding Overlay Failed: " + error.message);
    }
};

module.exports = { applyBranding };