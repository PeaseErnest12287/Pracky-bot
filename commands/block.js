const blocked = new Set();
module.exports = {
  name: 'block',
  handler: (ctx) => {
    const userId = ctx.message.text.split(' ')[1];
    if (!userId) return ctx.reply('Provide a user ID to block.');
    blocked.add(userId);
    ctx.reply(`🚫 Blocked user ${userId}`);
  }
};