// horoscope.js
const horoscopes = {
    'aries': 'Today you’ll find a spark of energy that will fuel your ambitions. Go for it!',
    'taurus': 'Patience will be your greatest asset today. Take things slow and steady.',
    'gemini': 'Expect new opportunities to come your way, but be cautious before jumping in.',
    'cancer': 'Your emotions will be at the forefront today. Stay grounded.',
    'leo': 'A day for self-expression and shining your unique light. Go for it!',
    'virgo': 'Take time to organize your thoughts and focus on important tasks.',
    'libra': 'Today is about balance. Make sure you’re finding harmony in your life.',
    'scorpio': 'Your intuition will be strong today. Trust your gut and make bold moves.',
    'sagittarius': 'Adventure awaits! Be ready for new experiences and growth.',
    'capricorn': 'Hard work will pay off today. Stay disciplined and focused.',
    'aquarius': 'Innovation is key today. Think outside the box and take risks.',
    'pisces': 'Your creativity will flow today. Use it to express yourself in new ways.'
  };
  
  module.exports = {
    name: 'horoscope',
    handler: (ctx) => {
      const sign = ctx.message.text.split(' ')[1]?.toLowerCase();
      if (!sign || !horoscopes[sign]) {
        return ctx.reply('Please provide a valid zodiac sign (e.g., "aries", "taurus").');
      }
      const horoscope = horoscopes[sign];
      ctx.reply(`🔮 Your horoscope for today: ${horoscope}`);
    }
  };
  