 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'merge',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const targetSquad = ctx.message.text.split(' ')[1];

    if (!db.army[id].squad || db.squads[db.army[id].squad].leader !== id) {
      return ctx.reply("❌ Only squad leaders can merge!");
    }

    if (!targetSquad || !db.squads[targetSquad]) {
      return ctx.reply("🔍 Target squad not found!");
    }

    const yourSquad = db.squads[db.army[id].squad];
    const enemySquad = db.squads[targetSquad];

    // Merge logic
    yourSquad.members.push(...enemySquad.members);
    yourSquad.resources.gold += enemySquad.resources.gold;
    yourSquad.resources.food += enemySquad.resources.food;

    enemySquad.members.forEach(memberId => {
      db.army[memberId].squad = yourSquad.name;
    });

    delete db.squads[targetSquad];
    fs.writeFileSync(path, JSON.stringify(db, null, 2));
    ctx.reply(`🔄 Merged with ${targetSquad}! Your squad now has ${yourSquad.members.length} members.`);
  }
};