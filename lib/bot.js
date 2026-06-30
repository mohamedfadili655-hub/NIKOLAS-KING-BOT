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

const { Boom } = require('@hapi/boom');
const makeWASocket = require('@whiskeysockets/baileys').default;
const { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { logger } = require('../utils/logger');
const readline = require('readline');
const fs = require('fs-extra');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function bot() {
  try {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    logger.info(`✅ Using Baileys v${version.join('.')}, Latest: ${isLatest}`);

    const { state, saveCreds } = await useMultiFileAuthState('./session');

    // Check if session exists
    const sessionPath = './session/creds.json';
    if (!fs.existsSync(sessionPath)) {
      logger.warn('📱 No session found. Starting Pairing Code Login...');
      
      const phoneNumber = await question('\n📲 Enter your WhatsApp number (with country code, e.g., 212629546024):\n> ');
      
      if (!phoneNumber || phoneNumber.length < 10) {
        logger.error('❌ Invalid phone number!');
        process.exit(1);
      }

      const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state
      });

      sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'open') {
          logger.success('✅ Connected successfully!');
          rl.close();
          process.exit(0);
        }
      });

      const code = await sock.requestPairingCode(phoneNumber);
      logger.success('\n🔐 Your Pairing Code:\n');
      console.log('\n' + '═'.repeat(50));
      console.log(`   ${code}`);
      console.log('═'.repeat(50) + '\n');
      logger.info('⏳ Please check your WhatsApp to accept the pairing code...');
      
      return;
    }

    // Main bot socket
    const sock = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      auth: state,
      shouldIgnoreJid: jid => false,
      generateHighQualityLinkPreview: true,
      syncFullHistory: true
    });

    // Store commands and plugins
    sock.commands = new Map();
    sock.plugins = new Map();
    sock.config = require('../config/config');
    sock.logger = logger;
    sock.db = require('quick.db');

    // Load commands and handlers
    await require('../handlers/commandHandler')(sock);

    // Handle messages
    sock.ev.on('messages.upsert', async ({ messages }) => {
      for (const msg of messages) {
        if (msg.key.fromMe || !msg.message) continue;

        try {
          const text = msg.message.conversation || 
                       msg.message.extendedTextMessage?.text || 
                       msg.message.imageMessage?.caption || '';
          
          if (!text.startsWith('.')) continue;

          const [cmd, ...args] = text.slice(1).split(' ');
          const command = sock.commands.get(cmd.toLowerCase());

          if (command) {
            await command.run(sock, msg, args);
          }
        } catch (err) {
          logger.error(`Error processing message: ${err.message}`);
        }
      }
    });

    // Handle connection updates
    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;
      
      if (qr) {
        console.log('\n🔐 Scan the QR code with your WhatsApp:\n');
      }
      
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
        logger.warn(`❌ Connection closed. Reconnecting: ${shouldReconnect}`);
        
        if (shouldReconnect) {
          setTimeout(() => bot(), 3000);
        }
      } else if (connection === 'open') {
        logger.success('✅ Bot connected successfully!');
        logger.info(`🤖 Bot ready as ${sock.user.name}`);
      }
    });

    // Save credentials
    sock.ev.on('creds.update', saveCreds);

    // Handle groups
    sock.ev.on('groups.update', async (groupUpdates) => {
      for (const update of groupUpdates) {
        logger.info(`Group Update: ${update.id}`);
      }
    });

    // Handle call events - Auto reject calls
    sock.ev.on('call', async (calls) => {
      for (const call of calls) {
        if (call.status === 'offer') {
          logger.warn(`📞 Incoming call from ${call.from} - Rejecting`);
          await sock.rejectCall(call.id, call.from);
        }
      }
    });

    return sock;

  } catch (error) {
    logger.error(`Fatal bot error: ${error.message}`);
    if (process.env.ENABLE_ANTI_CRASH === 'true') {
      logger.warn('🔄 Restarting bot due to anti-crash...');
      setTimeout(() => bot(), 5000);
    } else {
      process.exit(1);
    }
  }
}

module.exports = bot;
