const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');

// Initialize the bot with your token
const bot = new Telegraf('7328467873:AAG98VDQ-kKKiFLol43TYCzuC7ILSyXc6rc');

// Path to commands folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Dynamically load all commands
commandFiles.forEach(file => {
  const command = require(path.join(commandsPath, file));

  const actualHandler = command.handler || command.execute;

  if (!command.name || typeof actualHandler !== 'function') {
    console.error(`❌ Invalid command file: ${file}`);
    return;
  }

  bot.command(command.name, actualHandler);
  console.log(`✅ Loaded command: /${command.name}`);
});

// Bot startup message on restart
bot.launch().then(() => {
  const commandsCount = commandFiles.length;
  const version = 'v1.0'; // Could pull from package.json too
  const currentTime = new Date().toLocaleString();

  console.log(`🚀 Pracky bot has started!`);
  bot.telegram.sendMessage(
    'your_chat_id', // replace with your actual chat id for testing
    `✨ *Pracky Updated!*\n\nCommands: ${commandsCount}\nTime: ${currentTime}\nVersion: ${version}\n\nLet the games begin! 🔥`,
    { parse_mode: 'Markdown' }
  );
});
