 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'broadcast',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const message = ctx.message.text.split(' ').slice(1).join(' ');

    if (!db.army[id].squad) return ctx.reply("Join a squad first!");
    if (!message) return ctx.reply("Usage: `/broadcast Rally at dawn!`");

    const squad = db.squads[db.army[id].squad];
    ctx.reply(`📢 *Squad Broadcast*: ${message}\n\nFrom: @${db.army[id].name}`);
  }
};