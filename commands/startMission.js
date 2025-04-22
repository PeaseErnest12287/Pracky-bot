const fs = require('fs');
const path = require('path');

// Path to the JSON database
const dbPath = path.join(__dirname, '../storage/db.json');

module.exports = {
  name: 'startMission',
  handler: (ctx, missionId) => {
    const userId = ctx.from.id;

    // Read the database
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Check if user exists in the database
    if (!db.users[userId]) {
      return ctx.reply('🚫 You need to be recruited first. Use /recruit.');
    }

    // Check if mission exists
    const mission = db.missions.find(m => m.id === missionId);
    if (!mission) {
      return ctx.reply('🚫 Invalid mission ID.');
    }

    // Start the mission
    const user = db.users[userId];
    user.missions += 1;
    user.lastMission = mission.name;

    // Reward the user
    user.resources.gold += mission.reward.gold;
    user.resources.food += mission.reward.food;
    user.resources.weapons += mission.reward.weapons;

    // Save the updated data back
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    ctx.reply(`🚀 Mission started: *${mission.name}*\nReward: Gold - ${mission.reward.gold}, Food - ${mission.reward.food}, Weapons - ${mission.reward.weapons}`);
  }
};
