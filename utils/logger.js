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
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

fs.ensureDirSync('./logs');

const getTimestamp = () => moment().format('YYYY-MM-DD HH:mm:ss');

const logger = {
  info: (msg) => {
    const log = `[${getTimestamp()}] ℹ️  ${msg}`;
    console.log(chalk.blue(log));
    fs.appendFileSync('./logs/bot.log', log + '\n');
  },
  warn: (msg) => {
    const log = `[${getTimestamp()}] ⚠️  ${msg}`;
    console.log(chalk.yellow(log));
    fs.appendFileSync('./logs/bot.log', log + '\n');
  },
  error: (msg) => {
    const log = `[${getTimestamp()}] ❌ ${msg}`;
    console.log(chalk.red(log));
    fs.appendFileSync('./logs/bot.log', log + '\n');
  },
  success: (msg) => {
    const log = `[${getTimestamp()}] ✅ ${msg}`;
    console.log(chalk.green(log));
    fs.appendFileSync('./logs/bot.log', log + '\n');
  },
  debug: (msg) => {
    const log = `[${getTimestamp()}] 🐛 ${msg}`;
    console.log(chalk.magenta(log));
    fs.appendFileSync('./logs/bot.log', log + '\n');
  }
};

module.exports = { logger };
