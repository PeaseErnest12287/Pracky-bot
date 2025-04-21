module.exports = {
    name: 'unblock',
    handler: (ctx) => {
      const userId = ctx.message.text.split(' ')[1];
      blocked.delete(userId);
      ctx.reply(`✅ Unblocked user ${userId}`);
    }
  };