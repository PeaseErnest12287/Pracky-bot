// urban.js
const axios = require('axios');

module.exports = {
  name: 'urban',
  handler: async (ctx) => {
    const word = ctx.message.text.split(' ')[1];
    if (!word) {
      return ctx.reply('Please provide a word to search.');
    }

    try {
      const response = await axios.get(`https://api.urbandictionary.com/v0/define?term=${word}`);
      const definition = response.data.list[0]?.definition || 'No definition found for this word.';
      ctx.reply(`📖 Definition of ${word}: \n${definition}`);
    } catch (error) {
      ctx.reply('Sorry, I couldn’t fetch the definition. Try again later.');
    }
  }
};
