const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'recruit',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id, username, first_name } = ctx.from;
    const displayName = username || first_name;

    if (db.army[id]) return ctx.reply(`🫡 @${displayName}, you're already enlisted!`);

    db.army[id] = {
      name: displayName,
      rank: 'Private',
      level: 1,
      squad: null,
      resources: { gold: 50, food: 30 },
      stats: { strength: 5, stealth: 5 },
      codename: null,
      stealth: false
    };

    fs.writeFileSync(path, JSON.stringify(db, null, 2));
    ctx.reply(`🎖️ @${displayName}, welcome! Use /resources to check your supplies.`);
  }
};