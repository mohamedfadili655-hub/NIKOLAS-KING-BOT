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

const config = {
  ownerNumber: process.env.OWNER_NUMBER || '212629546024',
  ownerName: process.env.OWNER_NAME || 'NIKOLAS',
  botName: process.env.BOT_NAME || '👑 NIKOLAS KING BOT 👑',
  botWatermark: process.env.BOT_WATERMARK || 'NIKOLAS KING BOT',
  botFooter: process.env.BOT_FOOTER || 'Powered By NIKOLAS KING BOT',
  officialChannel: process.env.OFFICIAL_CHANNEL || 'https://whatsapp.com/channel/0029Vb7xCilBfxo7EKSaOk1J',
  version: '1.0.0'
};

function banner() {
  const bannerText = `
${chalk.yellow('█��████╗')}
${chalk.yellow('███╗   ██╗██╗██╗  ██╗ ██████╗ ██╗      █████╗ ███████╗')}
${chalk.yellow('██╔══██╗████╗  ██║██║██║ ██╔═══██╗██║     ██╔══██╗██╔════╝')}
${chalk.yellow('██████╔╝██╔██╗ ██║██║█████╔╝██║   ██║██║     ███████║███████╗')}
${chalk.yellow('██╔═══╝ ██║╚██╗██║██║██╔═██╗██║   ██║██║     ██╔══██║╚════██║')}
${chalk.yellow('██║     ██║ ╚████║██║██║  ██╗╚██████╔╝███████╗██║  ██║███████║')}
${chalk.yellow('╚═╝     ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝')}

${chalk.cyan('═════════════════════════════════════════')}
${chalk.green('👑 NIKOLAS KING BOT v' + config.version + ' 👑')}
${chalk.cyan('═════════════════════════════════════════')}

${chalk.cyan('Owner:')} ${chalk.yellow(config.ownerName)}
${chalk.cyan('Phone:')} ${chalk.yellow('+' + config.ownerNumber)}
${chalk.cyan('Channel:')} ${chalk.yellow(config.officialChannel)}

${chalk.cyan('Node:')} ${chalk.yellow(process.version)}
${chalk.cyan('Platform:')} ${chalk.yellow(process.platform)}
${chalk.cyan('RAM:')} ${chalk.yellow((os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + ' GB')}
${chalk.cyan('CPU Cores:')} ${chalk.yellow(os.cpus().length)}

${chalk.cyan('═════════════════════════════════════════')}
${chalk.green('Starting bot...')}
${chalk.cyan('═════════════════════════════════════════\n')}
  `;
  
  console.log(bannerText);
}

module.exports = { banner, config };
