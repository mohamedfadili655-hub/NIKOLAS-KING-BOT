/*
══════════════════════════════════════
👑 NIKOLAS KING BOT 👑

Developer : NIKOLAS

Owner : +212629546024

Official Channel:
https://whatsapp.com/channel/0029Vb7xCilBfxo7EKSaOk1J

© 2026 NIKOLAS KING BOT
All Rights Reserved.

Unauthorized copying, editing,
selling or re-uploading this source
without written permission is prohibited.
══════════════════════════════════════
*/

const chalk = require('chalk');
const os = require('os');
const fs = require('fs-extra');

const showBanner = () => {
  const banner = `
${chalk.cyan('██████╗')}
${chalk.cyan('███╗   ██╗██╗██╗  ██╗ ██████╗ ██╗      █████╗ ███████╗')}
${chalk.cyan('██╔══██╗████╗  ██║██║██║ ██╔═══██╗██║     ██╔══██╗██╔════╝')}
${chalk.cyan('██████╔╝██╔██╗ ██║██║█████╔╝██║   ██║██║     ███████║███████╗')}
${chalk.cyan('██╔═══╝ ██║╚██╗██║██║██╔═██╗██║   ██║██║     ██╔══██║╚════██║')}
${chalk.cyan('██║     ██║ ╚████║██║██║  ██╗╚██████╔╝███████╗██║  ██║███████║')}
${chalk.cyan('╚═╝     ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝')}

  ${chalk.magenta.bold('👑 NIKOLAS KING BOT 👑')}
  ${chalk.yellow('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
  
  ${chalk.green('✅ Bot Name:')} NIKOLAS KING BOT
  ${chalk.green('✅ Owner:')} NIKOLAS
  ${chalk.green('✅ Phone:')} +212629546024
  ${chalk.green('✅ Channel:')} https://whatsapp.com/channel/0029Vb7xCilBfxo7EKSaOk1J
  ${chalk.green('✅ Node:')} ${process.version}
  ${chalk.green('✅ Platform:')} ${os.platform()}
  ${chalk.green('✅ RAM:')} ${Math.round(os.totalmem() / 1024 / 1024)} MB
  
  ${chalk.yellow('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
  ${chalk.magenta('Powered By NIKOLAS KING BOT 👑')}
  `;
  console.log(banner);
};

const getRAMUsage = () => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  const total = os.totalmem() / 1024 / 1024;
  return {
    used: Math.round(used),
    total: Math.round(total),
    percentage: Math.round((used / total) * 100),
  };
};

const formatTime = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

const isOwner = (jid, ownerNumber) => {
  return jid.replace('@s.whatsapp.net', '').replace('@g.us', '') === ownerNumber;
};

const isGroup = (jid) => {
  return jid.endsWith('@g.us');
};

const isPrivate = (jid) => {
  return jid.endsWith('@s.whatsapp.net');
};

const getName = (jid) => {
  return jid.replace(/[@.]/g, ' ').split(' ')[0];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const arrayRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

module.exports = {
  showBanner,
  getRAMUsage,
  formatTime,
  isOwner,
  isGroup,
  isPrivate,
  getName,
  sleep,
  capitalize,
  randomInt,
  arrayRandom,
};
