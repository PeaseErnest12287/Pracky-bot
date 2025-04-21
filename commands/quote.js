module.exports = {
    name: 'quote',
    handler: (ctx) => {
      const quotes = [
        '“The best way to predict the future is to create it.” – Abraham Lincoln',
        '“Success is not final, failure is not fatal: It is the courage to continue that counts.” – Winston Churchill',
        '“Hardships often prepare ordinary people for an extraordinary destiny.” – C.S. Lewis'
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      ctx.reply(randomQuote);
    }
  };
  