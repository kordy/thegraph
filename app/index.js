const TelegramBot = require('node-telegram-bot-api');
const api = require('./api');
const utils = require('./utils');

const botToken = '1473468969:AAHK6sDfupFxXLGGuT3StjIv6DsckX4A1ns';
const bot = new TelegramBot(botToken, {polling: true});

const getLastSubgraphsInfo = () => api.getSubgraphs().then(response => {
  if (!response.data.error) {
    const message = '*Last deployed subgraphs:*\n\n' +
      response.data.data.communitySubgraphs.subgraphs.map(
        info => `${info.displayName}, ${new Intl.DateTimeFormat('en').format(new Date(info.deployedAt))}`
      ).join('\n');

    return message;
  }
  return 'Sorry, server is not available';
});

const getSubgraphsCountInfo = () => api.getSubgraphsCount().then(response => {
  if (!response.data.error) {
    return  '*Total deployed subgraphs:* ' + response.data.data.communitySubgraphs.totalCount;
  }
  return 'Sorry, server is not available';
}).catch((response) => console.log(response.data));


const getIndexersInfo = () => api.getIndexers().then(response => {
  if (!response.data.error) {

    const message = '*Indexers:*\n\n' +
      response.data.data.indexers.map(
        info => `[${info.id}](${info.url})\n` +
        `Owned: ${utils.abbreviateNumber(info.stakedTokens)} GRT\n` +
        `Fee cut: ${info.queryFeeCut / 10000}%\n` +
        `Reward cut: ${info.indexingRewardCut / 10000}%\n` +
        `Delegates: ${utils.abbreviateNumber(info.delegatedTokens)} GRT\n` +
        `Indexer Rewards: ${utils.abbreviateNumber(info.rewardsEarned)}\n`
      ).join('\n');

    return utils.escapeMsg(message);
  }
  return 'Sorry, server is not available';
});

const getGRTPiceInfo = () => api.getGRTPrice().then(response => {
  if (!response.data.error) {
    return '*Current GRT cost:* ' +  utils.escapeMsg(parseFloat(response.data.price).toFixed(5)) + ' USD';
  }
  return 'Sorry, server is not available';
});

const requestFunctionMap = {
  'last subgraphs': getLastSubgraphsInfo,
  'grt': getGRTPiceInfo,
  'total subgraphs': getSubgraphsCountInfo,
  'indexers': getIndexersInfo
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

bot.onText(/\/help/, (msg, match) => {
  const chatId = msg.chat.id;

  const message = `*Available commands:* \n\n` +
    `*\\/help* \\- Show all available commands\n` +
    `*\\/get total subgraphs* \\- Show total deployed subgraphs\n` +
    `*\\/get last subgraphs* \\- Show last 5 deployed subgraphs\n` +
    `*\\/get indexers* \\- Show 20 indexers sorted by deposited stake\n` +
    `*\\/get grt* \\- show current GRT/USD exchange rate `


  bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });

});
