 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'tribute',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const [_, targetUsername, amount] = ctx.message.text.split(' ');
    const amountNum = parseInt(amount);

    if (!targetUsername || !amountNum) {
      return ctx.reply("Usage: `/tribute @username <amount>`");
    }

    const targetId = Object.keys(db.army).find(
      key => db.army[key].name === targetUsername.replace('@', '')
    );

    if (!targetId || id === targetId) {
      return ctx.reply("❌ Invalid target.");
    }

    if (db.army[id].resources.gold < amountNum) {
      return ctx.reply("💰 Not enough gold!");
    }

    db.army[id].resources.gold -= amountNum;
    db.army[targetId].resources.gold += amountNum;
    fs.writeFileSync(path, JSON.stringify(db, null, 2));
    ctx.reply(`🎁 Gifted ${amountNum} gold to ${targetUsername}!`);
  }
};