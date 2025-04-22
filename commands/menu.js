const fs = require('fs');
const path = require('path');
const os = require('os');
require('dotenv').config();

const startTime = Date.now(); // Track bot's start time

module.exports = {
  name: 'menu',
  handler: (ctx) => {
    // Read commands folder
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Get version from .env or default to '1.0'
    const version = process.env.VERSION || '1.0';
    const botName = process.env.BOT_NAME || 'Pracky Bot';
    const prefix = process.env.PREFIX || '/'; // Default prefix
    const username = "Pease Ernest"; // Default user
    const creator = "Pease Ernest"; // Default creator

    // Calculate uptime
    const uptimeMs = Date.now() - startTime;
    const uptime = formatUptime(uptimeMs);

    // Create menu message with the command names
    let menuMessage = `🌟 *${botName} Menu (v${version})*\n\n`;
    menuMessage += `👤 *Username:* ${username}\n`;
    menuMessage += `👨‍💻 *Creator:* ${creator}\n`;
    menuMessage += `🕒 *Uptime:* ${uptime}\n`;
    menuMessage += `🔢 *Commands Available:* ${commandFiles.length}\n`;
    menuMessage += `⚙️ *Prefix:* ${prefix}\n\n`;

    menuMessage += '📜 *Available Commands:*\n\n';
    
    // Dynamically list commands
    commandFiles.forEach(file => {
      const commandName = file.replace('.js', '');
      menuMessage += `/${commandName} - Description (coming soon)\n`; // Placeholder for description
    });

    menuMessage += `\n💡 *Footer:* Use ${prefix}help for more information!`;
    
    // Send the dynamic menu
    ctx.reply(menuMessage, { parse_mode: 'Markdown' });
  }
};

// Helper function to format the bot's uptime
function formatUptime(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
