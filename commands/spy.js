 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'spy',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const targetUsername = ctx.message.text.split(' ')[1];

    if (!targetUsername) {
      return ctx.reply("Usage: `/spy @username`");
    }

    const targetId = Object.keys(db.army).find(
      key => db.army[key].name === targetUsername.replace('@', '')
    );

    if (!targetId) return ctx.reply("🔍 Target not found.");

    const target = db.army[targetId];
    ctx.reply(`
🕵️ *Spy Report*: ${target.name}
- Rank: ${target.rank}
- Level: ${target.level}
- Strength: ${target.stats.strength}
- Stealth: ${target.stats.stealth}
- Gold: ${target.resources.gold}
- Squad: ${target.squad || "None"}
    `);
  }
};