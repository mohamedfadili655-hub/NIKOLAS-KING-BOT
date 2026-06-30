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

const config = {
  // Bot Settings
  botName: '👑 NIKOLAS KING BOT 👑',
  ownerNumber: '212629546024',
  ownerName: 'NIKOLAS',
  prefix: '.',
  
  // Channels & Links
  officialChannel: 'https://whatsapp.com/channel/0029Vb7xCilBfxo7EKSaOk1J',
  
  // Features
  features: {
    economy: true,
    level: true,
    premium: true,
    warns: true,
    antilink: true,
    antispam: true,
    antibot: true,
    anticall: true,
    antidelete: true,
    antiviewonce: true,
    welcome: true,
    goodbye: true,
    autoread: true,
    autotyping: true,
    autorecording: true,
    ai: true,
    downloader: true,
    games: true,
  },
  
  // API Settings
  apis: {
    openai: process.env.OPENAI_API_KEY || null,
    deepai: process.env.DEEP_AI_KEY || null,
  },
  
  // Database
  database: {
    type: 'json',
    path: './database',
  },
  
  // Session
  session: {
    dir: './session',
    autoReconnect: true,
    reconnectInterval: 3000,
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dir: './logs',
  },
  
  // Production Mode
  production: process.env.PRODUCTION === 'true',
};

module.exports = config;
