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

// Color codes
const colors = {
  info: chalk.cyan,
  success: chalk.green,
  warn: chalk.yellow,
  error: chalk.red,
  debug: chalk.magenta,
};

const logger = {
  info: (msg) => console.log(colors.info(`[ℹ️  INFO] ${msg}`)),
  success: (msg) => console.log(colors.success(`[✅ SUCCESS] ${msg}`)),
  warn: (msg) => console.log(colors.warn(`[⚠️  WARN] ${msg}`)),
  error: (msg) => console.log(colors.error(`[❌ ERROR] ${msg}`)),
  debug: (msg) => console.log(colors.debug(`[🐛 DEBUG] ${msg}`)),
};

module.exports = { logger };
