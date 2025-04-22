module.exports = {
    name: 'infogame',
    handler: async (ctx) => {
      const message = `
  🎖️ *PRACKY ARMY COMMANDS* 🎖️
  
  1. \`/recruit\` - Enlist in the army.
  2. \`/squad create|join <name>\` - Manage squads.
  3. \`/dropmission\` - Risk-reward missions.
  4. \`/buy <item>\` - Purchase gear (sword, cloak).
  5. \`/resources\` - Check your gold/food.
  6. \`/train\` - Boost stats (strength/stealth).
  7. \`/tribute <@user> <amount>\` - Gift resources.
  8. \`/spy <@user>\` - Peek at enemy stats (cooldown: 1h).
  9. \`/ranks\` - View rank hierarchy.
  10. \`/codename <name>\` - Set a secret alias.
  11. \`/stealthmode\` - Toggle visibility.
  12. \`/betray\` - Leave squad & steal resources.
  13. \`/merge <squad>\` - Combine squads (leader-only).
  14. \`/broadcast <msg>\` - Send squad-wide alert.
  15. \`/globalmission\` - Join large-scale events.
  16. \`/leaderboard <criteria>\` - Top 10 rankings.
  17. \`/boardroom\` - Leaders-only chat.
  18. \`/infogame\` - This menu.
  
  *"Knowledge is power."* - Sun Tzu (probably)
  `;
  
      await ctx.reply(message);
    }
  };
  