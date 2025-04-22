const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'help',
  handler: (ctx) => {
    const prefix = '/'; // Slash command now
    const commandsPath = path.join(__dirname);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    let helpMessage = '🤖 *Here are all the available commands:*\n\n';
    commandFiles.forEach(file => {
      const commandName = file.replace('.js', '');
      helpMessage += `${prefix}${commandName} - Description (coming soon)\n`;
    });

    helpMessage += `\n*Bot Details:*\n`;
    helpMessage += `Bot Version: v${process.env.BOT_VERSION || '1.0.0'}\n`;
    helpMessage += `Creator: Pease Ernest\n`;
    helpMessage += `Prefix: ${prefix}\n`;
    helpMessage += `Uptime: ${process.uptime().toFixed(2)} seconds\n`;

    ctx.reply(helpMessage, { parse_mode: 'Markdown' });
  }
};
