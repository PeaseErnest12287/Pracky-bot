 
const fs = require('fs');
const path = './storage/db.json';

module.exports = {
  name: 'stealthmode',
  handler: async (ctx) => {
    const db = JSON.parse(fs.readFileSync(path));
    const { id } = ctx.from;

    db.army[id].stealth = !db.army[id].stealth;
    fs.writeFileSync(path, JSON.stringify(db, null, 2));
    ctx.reply(`👤 Stealth mode: ${db.army[id].stealth ? "ON" : "OFF"}`);
  }
};