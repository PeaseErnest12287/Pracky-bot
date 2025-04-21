module.exports = {
    name: 'hey',
    handler: (ctx) => {
      const currentHour = new Date().getHours();
      let greeting = '';
  
      if (currentHour < 12) {
        greeting = 'Good Morning! 🌅';
      } else if (currentHour < 18) {
        greeting = 'Good Afternoon! ☀️';
      } else {
        greeting = 'Good Evening! 🌙';
      }
  
      ctx.reply(greeting);
    }
  };
  