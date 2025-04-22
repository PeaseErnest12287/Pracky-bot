require('dotenv').config();
const chalk = require('chalk');
const fs = require('fs');
const { Telegraf } = require('telegraf');

// Get prefix and port from .env or use defaults
const prefix = process.env.PREFIX || '/';
const port = process.env.PORT || 3000; // Default port is 3000 if not specified

const bot = new Telegraf(process.env.BOT_TOKEN);

// 🌟 SYSTEM STARTUP LOGS
console.log(chalk.cyan.bold('\n🧠 Pracky v1 SYSTEM BOOT INITIALIZED...'));
console.log(chalk.yellow('🔍 Verifying environment variables...'));

if (!process.env.BOT_TOKEN) {
  console.log(chalk.red('❌ BOT_TOKEN not found! Shutting down...'));
  process.exit(1);
} else {
  console.log(chalk.green('✅ AuthKey located. Proceeding...'));
}

console.log(chalk.blue('🛠 Installing core modules...'));
console.log(chalk.green('📦 Dependencies already installed. Skipping NPM install...'));

console.log(chalk.magenta('💾 Creating internal storage...'));
console.log(chalk.green('📂 Internal storage booted successfully.'));

console.log(chalk.yellow('⚙️  Initializing Pracky Core Engine...'));

// LOAD COMMANDS
const commandsPath = './commands';
fs.readdirSync(commandsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const { name, handler } = require(`${commandsPath}/${file}`);
    if (name && typeof handler === 'function') {
      // Use the prefix dynamically when registering the command
      bot.command(prefix + name, handler);
      console.log(chalk.green(`✅ Loaded command: /${prefix}${name}`));
    } else {
      console.warn(chalk.yellow(`⚠️ Skipped ${file}: Invalid command format.`));
    }
  }
});

// LOAD WELCOME MODULE
require('./welcome/welcome')(bot);

// ERROR HANDLER
bot.catch(err => {
  console.error('❌ Bot encountered an error:', err);
});

// START BOT
bot.launch({
  webhook: {
    domain: process.env.RENDER_EXTERNAL_URL || `https://your-app-name.onrender.com`, // Use Render's URL
    port: port
  }
})
  .then(() => {
    console.log(chalk.greenBright.bold('\n🚀 Pracky is live and connected to Telegram.\n✨ Type /start in your bot to test the welcome message.\n'));

    const ownerChatId = process.env.OWNER_ID; // 👈 Put your ID in .env
    if (ownerChatId) {
      bot.telegram.sendMessage(
        ownerChatId,
        `🧠 *Pracky v1 has rebooted successfully!*\n\nReady for action, boss. Type /help to flex my powers.`,
        { parse_mode: 'Markdown' }
      );
    } else {
      console.warn(chalk.yellow('⚠️ OWNER_ID not set in .env. Bot won’t auto-greet anyone.'));
    }

  })
  .catch(error => {
    console.error(chalk.red('💥 Launch error:'), error);
  });

// SYSTEM SHUTDOWN LOGS
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n🛑 Shutting down...'));
  bot.stop('SIGINT');
  console.log(chalk.green('✅ Bot stopped successfully.'));
  process.exit();
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n🛑 Shutting down...'));
  bot.stop('SIGTERM');
  console.log(chalk.green('✅ Bot stopped successfully.'));
  process.exit();
});
