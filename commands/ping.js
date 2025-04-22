// ping.js
module.exports = {
    name: 'ping',
    handler: async (ctx) => {
      const start = Date.now();
      await ctx.reply('🏓 Pong!');
      const end = Date.now();
      const responseTime = end - start;
      ctx.reply(`🕒 Response time: ${responseTime}ms`);
    }
  };
  