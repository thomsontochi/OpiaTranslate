const fs = require('fs');
const { createCanvas } = require('canvas');

// Define icon sizes
const sizes = [16, 32, 48, 128];

// Project color scheme and abbreviation
const backgroundColor = '#4285f4'; // Google blue
const textColor = 'white';
const projectAbbreviation = 'OT'; // Short for OpiaTranslate

// Generate icons for each size
sizes.forEach(size => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Draw background circle
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw text in the center
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${size / 3}px Arial`; // Dynamically adjust font size based on icon size
    ctx.fillText(projectAbbreviation, size / 2, size / 2);
    
    // Save the icon as a PNG file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icons/icon${size}.png`, buffer);
});

console.log('Icons for OpiaTranslate generated successfully!');
