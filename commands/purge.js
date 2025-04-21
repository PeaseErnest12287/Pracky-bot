module.exports = {
    name: 'purge',
    handler: async (ctx) => {
      const count = parseInt(ctx.message.text.split(' ')[1], 10) || 5;
      const chatId = ctx.chat.id;
  
      for (let i = 0; i < count; i++) {
        try {
          await ctx.deleteMessage(ctx.message.message_id - i);
        } catch {}
      }
      ctx.reply(`🧼 Purged ${count} messages.`);
    }
  };
  