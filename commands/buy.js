 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'buy',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const user = db.army[id];
    const item = ctx.message.text.split(' ')[1];

    const shop = {
      sword: { cost: 30, effect: { strength: 2 } },
      cloak: { cost: 25, effect: { stealth: 3 } }
    };

    if (!item || !shop[item]) return ctx.reply(`🛒 Available: ${Object.keys(shop).join(', ')}`);

    if (user.resources.gold < shop[item].cost) {
      return ctx.reply(`💰 Not enough gold! You need ${shop[item].cost}.`);
    }

    user.resources.gold -= shop[item].cost;
    Object.entries(shop[item].effect).forEach(([stat, val]) => user.stats[stat] += val);
    fs.writeFileSync(path, JSON.stringify(db, null, 2));
    ctx.reply(`🛍️ Bought ${item}! Stats boosted.`);
  }
};