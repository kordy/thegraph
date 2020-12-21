const TelegramBot = require('node-telegram-bot-api');
const api = require('./api');

const botToken = '1473468969:AAHK6sDfupFxXLGGuT3StjIv6DsckX4A1ns';
const bot = new TelegramBot(botToken, {polling: true});


const getLastSubgraphsInfo = () => api.getSubgraphs().then(response => {
  if (response.data.data) {
    const message = '*Last deployed subgraphs:*\n\n' +
      response.data.data.communitySubgraphs.subgraphs.map(
        info => `${info.displayName}, ${new Intl.DateTimeFormat('en').format(new Date(info.deployedAt))}`
      ).join('\n');

    return message;
  }
  return 'Sorry, server is not available';
});

const requestFunctionMap = {
  'last subgraphs': getLastSubgraphsInfo
}

bot.onText(/\/get (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
    const requestName = match[1];

    const requestFunc = requestFunctionMap[requestName];
    
    if (requestFunc) {
      requestFunc().then(message => {
        console.log(message);
        bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
      })
    } else {
      bot.sendMessage(chatId, 'Sorry, I don`t know such request', { parse_mode: 'MarkdownV2' });
    }
});
