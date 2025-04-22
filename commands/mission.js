const fs = require('fs');
const path = require('path');

// Path to the JSON database
const dbPath = path.join(__dirname, '../storage/db.json');

module.exports = {
  name: 'mission',
  handler: (ctx) => {
    const userId = ctx.from.id;

    // Read the database
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Check if user exists in the database
    if (!db.users[userId]) {
      return ctx.reply('🚫 You need to be recruited first. Use /recruit.');
    }

    // Display available missions
    let missionList = '*Available Missions:*\n\n';
    db.missions.forEach(mission => {
      missionList += `📝 ${mission.name}\nDescription: ${mission.description}\nDifficulty: ${mission.difficulty}\nReward: Gold - ${mission.reward.gold}, Food - ${mission.reward.food}, Weapons - ${mission.reward.weapons}\n\n`;
    });

    ctx.reply(missionList, { parse_mode: 'Markdown' });
  }
};
