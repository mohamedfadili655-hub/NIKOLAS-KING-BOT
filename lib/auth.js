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

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const { Signale } = require('signale');
const { logger } = require('./logger');

const signale = new Signale();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function createBot() {
  const sessionDir = './session';
  const authFile = path.join(sessionDir, 'creds.json');
  
  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  // Check if session exists
  let creds = null;
  if (fs.existsSync(authFile)) {
    try {
      const data = fs.readFileSync(authFile, 'utf-8');
      creds = JSON.parse(data);
      logger.success('Session loaded from cache');
    } catch (e) {
      logger.warn('Failed to load session, creating new...');
    }
  }

  // If no session, ask for phone number and generate pairing code
  if (!creds) {
    let phoneNumber = process.env.OWNER_NUMBER;
    
    if (!phoneNumber) {
      phoneNumber = await question('\n📱 Enter your WhatsApp number (with country code): ');
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
      
      if (phoneNumber.length < 10) {
        logger.error('Invalid phone number!');
        process.exit(1);
      }
    }

    logger.info(`Generating pairing code for: +${phoneNumber}`);
    logger.info('Opening WhatsApp pairing...');
  }

  const { initAuthCreds, BufferJSON } = require('@whiskeysockets/baileys');
  const proto = require('@whiskeysockets/baileys').proto;
  
  const state = {
    creds: creds || initAuthCreds(),
    keys: {
      get: (type, jids) => {
        const data = {};
        jids.forEach((jid) => {
          const filePath = path.join(sessionDir, `${type}-${jid}.json`);
          if (fs.existsSync(filePath)) {
            data[jid] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          }
        });
        return data;
      },
      set: (data) => {
        Object.entries(data).forEach(([category, entries]) => {
          if (entries) {
            Object.entries(entries).forEach(([jid, value]) => {
              const filePath = path.join(sessionDir, `${category}-${jid}.json`);
              fs.writeFileSync(filePath, JSON.stringify(value, BufferJSON.replacer));
            });
          }
        });
      },
    },
  };

  const saveCreds = () => {
    fs.writeFileSync(authFile, JSON.stringify(state.creds, BufferJSON.replacer, 2));
  };

  return { state, saveCreds };
}

module.exports = { createBot, question };
