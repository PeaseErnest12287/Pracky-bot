const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'leaderboard',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const criteria = ctx.message.text.split(' ')[1] || 'gold';

    const sorted = Object.values(db.army).sort((a, b) => 
      (b.resources[criteria] || b.stats[criteria]) - (a.resources[criteria] || a.stats[criteria])
    ).slice(0, 10);

    ctx.reply(
      `🏆 *Leaderboard (${criteria})*\n` +
      sorted.map((u, i) => `${i + 1}. ${u.name}: ${u.resources[criteria] || u.stats[criteria]}`).join('\n')
    );
  }
};