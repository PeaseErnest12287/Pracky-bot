 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'codename',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;
    const newName = ctx.message.text.split(' ').slice(1).join(' ');

    if (!newName) return ctx.reply("Usage: `/codename Ghost`");

    db.army[id].codename = newName;
    fs.writeFileSync(path, JSON.stringify(db, null, 2));
    ctx.reply(`🦹 New codename: *${newName}*`);
  }
};