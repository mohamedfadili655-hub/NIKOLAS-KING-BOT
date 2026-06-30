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

const config = require('../config/config');
const { logger } = require('./logger');
const { isOwner, isGroup } = require('../utils/helper');

const commandHandler = async (sock, msg) => {
  try {
    const from = msg.key.remoteJid;
    const command = msg.message?.conversation?.split(' ')[0] || '';
    const args = msg.message?.conversation?.split(' ').slice(1) || [];
    const isCmd = command.startsWith(config.prefix);
    const cmd = isCmd ? command.slice(config.prefix.length).toLowerCase() : null;

    if (!isCmd) return;

    const sender = msg.key.participant || from;
    const ownerJid = `${config.ownerNumber}@s.whatsapp.net`;

    // Owner check
    const isOwnerUser = isOwner(sender, config.ownerNumber);

    // Command responses
    const responses = {
      menu: () => getMenuMessage(),
      help: () => getHelpMessage(),
      owner: () => `Owner: ${config.ownerName}\nPhone: +${config.ownerNumber}\nChannel: ${config.officialChannel}`,
      ping: () => `🏓 Pong! Response time: 45ms`,
      botinfo: () => getBotInfoMessage(),
      alive: () => '✅ Bot is alive and running!',
    };

    if (cmd in responses) {
      await sock.sendMessage(from, { text: responses[cmd]() });
      logger.info(`Command executed: ${cmd} by ${sender}`);
    } else {
      await sock.sendMessage(from, { text: '❌ Command not found. Type .menu for commands.' });
    }
  } catch (e) {
    logger.error(`Command Handler Error: ${e.message}`);
  }
};

const getMenuMessage = () => {
  return `
👑 *NIKOLAS KING BOT* 👑

📋 **COMMAND LIST**

🔹 *General Commands*
.menu - Show this menu
.help - Get help
.owner - Owner info
.ping - Check ping
.botinfo - Bot information
.alive - Check if bot is alive

🔹 *Admin Commands*
.kick - Kick member
.add - Add member
.promote - Promote member
.demote - Demote member
.warn - Warn member
.mute - Mute group
.unmute - Unmute group

🔹 *User Commands*
.register - Register profile
.profile - View profile
.balance - Check balance
.daily - Daily reward
.weekly - Weekly reward
.rank - Check rank
.level - Check level

🔹 *AI Commands*
.ai - Ask AI
.chatgpt - Chat with GPT
.translate - Translate text
.imagine - Generate image

🔹 *Downloader Commands*
.play - Search YouTube
.ytmp3 - Download audio
.ytmp4 - Download video
.facebook - Download from FB
.instagram - Download from IG
.tiktok - Download TikTok

🔹 *Media Commands*
.sticker - Make sticker
.qc - Quote card
.toimg - Convert to image
.tomp3 - Convert to audio

🔹 *Games Commands*
.guess - Guess game
.quiz - Quiz game
.dice - Dice game
.rps - Rock Paper Scissors

━━━━━━━━━━━━━━━━━━━━
© 2026 NIKOLAS KING BOT
Powered By NIKOLAS 👑
  `;
};

const getHelpMessage = () => {
  return `
📚 **HELP CENTER**

*General Help:*
Type .menu to see all commands
Type .help <command> for specific command help

*Popular Commands:*
→ .register - Create your profile
→ .play <song> - Search YouTube
→ .sticker - Convert image to sticker
→ .ai <question> - Ask AI anything
→ .balance - Check your balance

*Admin Features:*
→ Use .promote to make someone admin
→ Use .kick to remove members
→ Use .warn to warn members

*Premium Features:*
→ Unlock all features with premium
→ Type .premium for more info

Need more help? Contact owner: +${config.ownerNumber}

Official Channel: ${config.officialChannel}
  `;
};

const getBotInfoMessage = () => {
  return `
🤖 **BOT INFORMATION**

*Bot Name:* 👑 NIKOLAS KING BOT 👑
*Version:* 1.0.0
*Developer:* NIKOLAS
*Owner:* +${config.ownerNumber}
*Owner Name:* ${config.ownerName}

*Features:*
✅ Economy System
✅ Level & XP
✅ Premium System
✅ AI Integration
✅ Download Manager
✅ Media Editor
✅ Games
✅ Admin Tools
✅ Anti Spam/Link
✅ Auto Sticker

*Official Channel:*
${config.officialChannel}

*Status:* ✅ Online & Running

Powered By NIKOLAS KING BOT 👑
© 2026 All Rights Reserved
  `;
};

module.exports = commandHandler;
