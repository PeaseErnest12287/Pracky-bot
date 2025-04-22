 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'betray',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const user = db.army[id];

    if (!user.squad) return ctx.reply("You're not in a squad!");
    const squad = db.squads[user.squad];

    if (Math.random() > 0.5) {
      const stolenGold = Math.floor(squad.resources.gold * 0.3);
      user.resources.gold += stolenGold;
      squad.resources.gold -= stolenGold;
      ctx.reply(`🗡️ Betrayal successful! Stole ${stolenGold} gold.`);
    } else {
      ctx.reply("⚖️ Betrayal failed! Your squad kicked you out.");
    }

    squad.members = squad.members.filter(m => m !== id);
    user.squad = null;
    fs.writeFileSync(path, JSON.stringify(db, null, 2));
  }
};