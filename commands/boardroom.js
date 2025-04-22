 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'boardroom',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const userSquad = db.army[id].squad;

    if (!userSquad || db.squads[userSquad].leader !== id) {
      return ctx.reply("🚫 Access denied. Squad leaders only.");
    }

    ctx.reply(`🔒 *Boardroom Access Granted*. Discuss strategy here.`);
  }
};