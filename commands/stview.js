const fs = require('fs');

module.exports = {
  name: 'inspect',
  handler: (ctx) => {
    const args = ctx.message.text.split(' ').slice(1);
    const idOrName = args.join(' ').toLowerCase();

    let data;
    try {
      data = JSON.parse(fs.readFileSync(`${__dirname}/userData.json`, 'utf-8'));
    } catch (err) {
      console.error('❌ Failed to read userdata.json:', err);
      return ctx.reply('⚠️ Could not read user data file.');
    }

    const found = Object.values(data).find(
      user => user.name.toLowerCase() === idOrName || user.id.toString() === idOrName
    );

    if (!found) return ctx.reply('❌ User not found.');

    ctx.reply(`👤 Name: ${found.name}\n🆔 ID: ${found.id}\n📍 City: ${found.city || 'N/A'}\n📁 Saved: ${Object.keys(found).length - 2} keys`);
  }
};
