module.exports = {
    name: 'status',
    handler: (ctx) => {
      const uptime = process.uptime();
      ctx.reply(`PrackyBot has been running for ${uptime} seconds.\nSystem status: All systems are operational. 💻🚀`);
    }
  };
  