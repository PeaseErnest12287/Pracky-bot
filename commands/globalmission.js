 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'globalmission',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const missionReward = 100;

    Object.keys(db.army).forEach(id => {
      db.army[id].resources.gold += missionReward;
    });

    fs.writeFileSync(path, JSON.stringify(db, null, 2));
    ctx.reply(`🌍 *GLOBAL MISSION COMPLETE!* +${missionReward} gold for all soldiers!`);
  }
};