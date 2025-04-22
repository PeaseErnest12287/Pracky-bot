const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'dropmission',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const user = db.army[id];

    const missions = [
      { name: "Ambush", reward: { gold: 20 }, risk: 40 - user.stats.strength },
      { name: "Recon", reward: { food: 15 }, risk: 30 - user.stats.stealth }
    ];
    const mission = missions[Math.floor(Math.random() * missions.length)];
    const success = Math.random() * 100 > mission.risk;

    if (success) {
      Object.entries(mission.reward).forEach(([res, amt]) => user.resources[res] += amt);
      ctx.reply(`✅ *${mission.name}* success! +${JSON.stringify(mission.reward)}`);
    } else {
      ctx.reply(`💥 *${mission.name}* failed! No rewards.`);
    }

    fs.writeFileSync(path, JSON.stringify(db, null, 2));
  }
};