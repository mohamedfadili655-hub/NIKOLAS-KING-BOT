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

const { readdirSync } = require('fs');
const { join } = require('path');
const { logger } = require('../utils/logger');

module.exports = async (sock) => {
  try {
    const commandsDir = join(__dirname, '../commands');
    const files = readdirSync(commandsDir).filter(f => f.endsWith('.js'));

    for (const file of files) {
      try {
        const command = require(`../commands/${file}`);
        
        if (command && command.command) {
          sock.commands.set(command.command.toLowerCase(), command);
          logger.debug(`✅ Command loaded: ${command.command}`);
        }
      } catch (err) {
        logger.error(`Error loading command ${file}: ${err.message}`);
      }
    }

    logger.success(`🎉 ${sock.commands.size} commands loaded successfully!`);
  } catch (error) {
    logger.error(`Failed to load commands: ${error.message}`);
  }
};
