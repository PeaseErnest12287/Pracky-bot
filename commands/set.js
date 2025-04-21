const fs = require('fs');
const path = require('path');

const userDataFile = path.join(__dirname, 'userData.json');

function readUserData() {
  if (fs.existsSync(userDataFile)) {
    return JSON.parse(fs.readFileSync(userDataFile, 'utf8'));
  }
  return {};
}

function saveUserData(userData) {
  fs.writeFileSync(userDataFile, JSON.stringify(userData, null, 2));
}

function generateId() {
  return Math.floor(1000 + Math.random() * 9000); // 4-digit random ID
}

module.exports = {
  name: 'set',
  handler: (ctx) => {
    const args = ctx.message.text.split(' ').slice(1); // After /set

    if (args.length === 0) {
      return ctx.reply('❗ Please provide a name or preference (e.g. /set John or /set John city New York)');
    }

    let userData = readUserData();

    const name = args[0];
    const newId = generateId();

    const newUser = {
      id: newId,
      name
    };

    if (args.length > 1) {
      const key = args[1]; // e.g., city
      const value = args.slice(2).join(' ');
      newUser[key] = value;
    }

    userData[newId] = newUser;

    saveUserData(userData);

    return ctx.reply(`✅ New user created!\n👤 Name: ${name}\n🆔 ID: ${newId}\n🎉 Preferences saved!`);
  }
};
