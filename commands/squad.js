const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'squad',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const args = ctx.message.text.split(' ').slice(1);

    if (!args.length) {
      if (!db.army[id].squad) return ctx.reply("You're squadless. Use `/squad create <name>` or `/squad join <name>`.");
      const squad = db.squads[db.army[id].squad];
      return ctx.reply(
        `🛡️ *${squad.name}*\nLeader: @${db.army[squad.leader].name}\n` +
        `Resources: ${squad.resources.gold} gold / ${squad.resources.food} food\n` +
        `Members: ${squad.members.map(m => db.army[m].name).join(', ')}`
      );
    }

    if (args[0] === 'create' && args[1]) {
      if (db.army[id].squad) return ctx.reply("Leave your squad first!");
      const squadName = args.slice(1).join(' ');
      db.squads[squadName] = {
        name: squadName,
        leader: id,
        members: [id],
        resources: { gold: 0, food: 0 }
      };
      db.army[id].squad = squadName;
      fs.writeFileSync(path, JSON.stringify(db, null, 2));
      return ctx.reply(`⚔️ Squad *${squadName}* created! Use /broadcast to rally your team.`);
    }

    if (args[0] === 'join' && args[1]) {
      const squadName = args.slice(1).join(' ');
      if (!db.squads[squadName]) return ctx.reply("Squad doesn’t exist!");
      if (db.army[id].squad) return ctx.reply("Leave your squad first!");
      db.squads[squadName].members.push(id);
      db.army[id].squad = squadName;
      fs.writeFileSync(path, JSON.stringify(db, null, 2));
      ctx.reply(`🪖 Joined squad *${squadName}*!`);
    }
  }
};