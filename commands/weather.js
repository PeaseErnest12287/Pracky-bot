const axios = require("axios");

const API_KEY = "ffa8b367402d413590082032242406";

module.exports = {
  name: "weather",
  description: "Get current weather for a city.",
  handler: async (ctx) => {
    const input = ctx.message.text.split(" ").slice(1).join(" ");
    if (!input) {
      return ctx.reply("🌍 Please provide a city name. Example: /weather Nairobi");
    }

    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input}&aqi=no`);
      const data = response.data;

      const message = `
🌍 Weather in *${data.location.name}, ${data.location.country}*
🕒 Local Time: ${data.location.localtime}
🌡️ Temp: ${data.current.temp_c}°C (${data.current.temp_f}°F)
🌥️ Condition: ${data.current.condition.text}
💨 Wind: ${data.current.wind_kph} km/h
`;

      ctx.replyWithMarkdown(message);
    } catch (error) {
      console.error(error.message);
      ctx.reply("❌ Couldn't fetch weather. Maybe the city name is invalid?");
    }
  }
};
