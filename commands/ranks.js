 
module.exports = {
    name: 'ranks',
    handler: async (ctx) => {
      ctx.reply(`
  ⭐ *Army Ranks* ⭐
  1. Private (Lvl 1)
  2. Corporal (Lvl 5)
  3. Sergeant (Lvl 10)
  4. Captain (Lvl 15)
  5. General (Lvl 20)
  
  *Promote by leveling up (/train).*
      `);
    }
  };