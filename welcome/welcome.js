const chalk = require('chalk');
const fs = require('fs');
require('dotenv').config(); // Just in case it's not already loaded

function sendWelcome(bot) {
  const currentTime = new Date().toLocaleString();
  const chatId = process.env.OWNER_ID;
  const version = process.env.VERSION || 'dev';

  // Count .js files in the commands folder
  const commandsDir = './commands';
  let commandCount = 0;
  try {
    commandCount = fs.readdirSync(commandsDir)
      .filter(file => file.endsWith('.js')).length;
  } catch (err) {
    console.error(chalk.red('❌ Failed to read commands folder:'), err);
  }

  const message = `
👋 *Welcome to Pracky v${version}!*

🧠 *Command count:* ${commandCount}
🕒 *Launched at:* ${currentTime}

💬 _I’m fully charged and at your service, boss._
📢 _Feel free to send ideas, feedback, and wild features._

🔥 *Let’s make some chaos (responsibly).*
`;

  if (chatId) {
    bot.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    console.log(chalk.magentaBright("🎉 Sent welcome message to owner!"));
  } else {
    console.log(chalk.redBright("⚠️ OWNER_ID not defined in .env, can't send welcome message."));
  }
}

module.exports = sendWelcome;
