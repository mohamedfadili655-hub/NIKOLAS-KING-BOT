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

module.exports = {
  command: 'menu',
  category: 'general',
  description: 'Display bot menu',
  
  run: async (sock, msg, args) => {
    const menu = `
╔═══════════════════════════════════╗
║     👑 NIKOLAS KING BOT 👑        ║
║        Command Menu v1.0          ║
╚═══════════════════════════════════╝

📋 *USER COMMANDS*
.menu - Show this menu
.help - Get help info
.ping - Check bot response
.profile - View your profile
.profile [tag] - View user profile
.stats - View your stats
.daily - Claim daily reward
.weekly - Claim weekly reward
.balance - Check your balance
.transfer @user amount - Send money
.store - View shop items
.buy item_id - Buy item
.inventory - Check your items
.bank - Bank commands

🎮 *FUN COMMANDS*
.tictactoe @user - Play tic tac toe
.highlow - Play high low game
.dice - Roll dice game
.rps - Rock paper scissors
.quiz - Answer quiz questions
.meme - Get random meme
.joke - Get random joke
.fact - Get random fact
.quote - Get random quote

📥 *DOWNLOADER COMMANDS*
.ytmp3 [url] - Download audio from YouTube
.ytmp4 [url] - Download video from YouTube
.tiktok [url] - Download TikTok video
.instagram [url] - Download Instagram post
.facebook [url] - Download Facebook video
.twitter [url] - Download Twitter video
.pinterest [url] - Download Pinterest image

🖼️ *STICKER COMMANDS*
.sticker - Convert image to sticker
.sticker pack_name - Sticker pack commands
.sticker search query - Search stickers
.sticker steal - Steal sticker info

🎨 *TOOLS*
.qr text - Generate QR code
.tts text - Text to speech
.define word - Define a word
.translate lang text - Translate text
.weather city - Get weather info
.calculator expression - Calculate math

🤖 *AI COMMANDS*
.ask question - Ask AI a question
.gpt prompt - Generate text with AI
.imagine prompt - Generate image with AI

🔧 *ADMIN COMMANDS*
.warn @user reason - Warn a user
.kick @user reason - Kick a user
.mute @user time - Mute a user
.unmute @user - Unmute a user
.ban @user reason - Ban a user
.unban @user - Unban a user
.promote @user - Promote to admin
.demote @user - Demote from admin
.setdesc description - Set group description
.setname name - Set group name

👑 *OWNER COMMANDS*
.eval code - Execute code
.exec command - Execute system command
.broadcast message - Broadcast message
.ban-global jid - Global ban
.unban-global jid - Remove global ban
.setbio text - Set bot bio
.block @user - Block user
.unblock @user - Unblock user
.restart - Restart bot

💬 *GROUP COMMANDS*
.group link - Get group link
.group info - Get group info
.group members - Get members info
.group settings - Manage group settings

📊 *PREMIUM FEATURES*
.premium info - Premium information
.premium upgrade - Upgrade to premium
.premium status - Check premium status

═════════════════════════════════════
Official Channel: ${config.officialChannel}
Owner: ${config.ownerName} (+${config.ownerNumber})

Use: .help [command] for detailed info
═════════════════════════════════════
    `;

    await sock.sendMessage(msg.key.remoteJid, {
      text: menu
    }, { quoted: msg });
  }
};
