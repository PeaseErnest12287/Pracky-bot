const fs = require('fs');
const path = require('path');

// Path to the JSON database
const dbPath = path.join(__dirname, '../storage/db.json');

module.exports = {
  name: 'upgrade',
  handler: (ctx) => {
    const userId = ctx.from.id;

    // Read the database
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Check if user exists in the database
    if (!db.users[userId]) {
      return ctx.reply('🚫 You need to be recruited first. Use /recruit.');
    }

    // Check if user has enough resources for an upgrade
    const user = db.users[userId];
    if (user.resources.gold < 100 || user.resources.food < 50) {
      return ctx.reply('🚫 You don\'t have enough resources for an upgrade.');
    }

    // Upgrade the user
    user.level += 1;
    user.resources.gold -= 100;
    user.resources.food -= 50;

    // Save the updated data back
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    ctx.reply(`🎉 Congratulations, you've leveled up! You are now level ${user.level}.`);
  }
};
