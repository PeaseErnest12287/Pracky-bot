 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'train',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const user = db.army[id];
    const stat = ctx.message.text.split(' ')[1];

    if (!stat || !['strength', 'stealth'].includes(stat)) {
      return ctx.reply("Specify: `/train strength` or `/train stealth`");
    }

    const cost = 10 * user.stats[stat];
    if (user.resources.gold < cost) {
      return ctx.reply(`💰 Need ${cost} gold to train ${stat}!`);
    }

    user.resources.gold -= cost;
    user.stats[stat] += 1;
    fs.writeFileSync(path, JSON.stringify(db, null, 2));
    ctx.reply(`💪 ${stat.toUpperCase()} increased to ${user.stats[stat]}! (-${cost} gold)`);
  }
};