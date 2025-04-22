const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'resources',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const user = db.army[id];
    let reply = `💰 *Your Resources*\nGold: ${user.resources.gold} | Food: ${user.resources.food}`;

    if (user.squad) {
      const squad = db.squads[user.squad];
      reply += `\n\n🛡️ *Squad Resources*\nGold: ${squad.resources.gold} | Food: ${squad.resources.food}`;
    }

    ctx.reply(reply);
  }
};