module.exports = {
    name: 'calc',
    handler: (ctx) => {
      const expression = ctx.message.text.split(' ').slice(1).join(' ');
      try {
        const result = eval(expression);
        ctx.reply(`Result: ${result}`);
      } catch (err) {
        ctx.reply('Error in the expression! Try again with a valid one.');
      }
    }
  };
  