const fs = require('fs');
const path = require('path');

// Path to the user data file
const userDataFile = path.join(__dirname, 'userData.json');

// Function to read user data from the JSON file
function readUserData() {
  if (fs.existsSync(userDataFile)) {
    return JSON.parse(fs.readFileSync(userDataFile, 'utf8'));
  }
  return {}; // Return an empty object if no data exists
}

module.exports = {
  name: 'inspect',
  handler: (ctx) => {
    const args = ctx.message.text.split(' ').slice(1); // Get all arguments after "/inspect"
    const idOrName = args.join(' ').toLowerCase();

    if (!idOrName) {
      return ctx.reply('❗ Please provide a name or user ID to inspect.');
    }

    let data;
    try {
      data = readUserData();
    } catch (err) {
      console.error('❌ Failed to read userdata.json:', err);
      return ctx.reply('🚨 Could not read user data file.');
    }

    // Look for user by name or ID
    const found = Object.values(data).find(user =>
      (user.name && user.name.toLowerCase() === idOrName) ||
      user.id?.toString() === idOrName
    );

    if (!found) {
      return ctx.reply('🔍 User not found in the database.');
    }

    const totalKeys = Object.keys(found).length - 2; // excluding name and id

    ctx.reply(`🔎 *User Inspection Result:*\n\n👤 *Name:* ${found.name}\n🆔 *ID:* ${found.id}\n📍 *City:* ${found.city || 'Not Set'}\n📁 *Saved Keys:* ${totalKeys}`, {
      parse_mode: 'Markdown',
    });
  }
};
