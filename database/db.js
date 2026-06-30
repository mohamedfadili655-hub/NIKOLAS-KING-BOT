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
const { logger } = require('../lib/logger');

class Database {
  constructor(dbPath = './database') {
    this.dbPath = dbPath;
    this.data = {};
    this.init();
  }

  init() {
    if (!fs.existsSync(this.dbPath)) {
      fs.mkdirSync(this.dbPath, { recursive: true });
    }
  }

  get(key, defaultValue = null) {
    const filePath = path.join(this.dbPath, `${key}.json`);
    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {
        logger.error(`Error reading ${key}: ${e.message}`);
        return defaultValue;
      }
    }
    return defaultValue;
  }

  set(key, value) {
    const filePath = path.join(this.dbPath, `${key}.json`);
    try {
      fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
      return true;
    } catch (e) {
      logger.error(`Error writing ${key}: ${e.message}`);
      return false;
    }
  }

  push(key, value) {
    const data = this.get(key, []);
    if (Array.isArray(data)) {
      data.push(value);
      return this.set(key, data);
    }
    return false;
  }

  remove(key, filter) {
    const data = this.get(key, []);
    if (Array.isArray(data)) {
      const filtered = data.filter(filter);
      return this.set(key, filtered);
    }
    return false;
  }

  has(key) {
    const filePath = path.join(this.dbPath, `${key}.json`);
    return fs.existsSync(filePath);
  }

  delete(key) {
    const filePath = path.join(this.dbPath, `${key}.json`);
    if (fs.existsSync(filePath)) {
      try {
        fs.removeSync(filePath);
        return true;
      } catch (e) {
        logger.error(`Error deleting ${key}: ${e.message}`);
        return false;
      }
    }
    return false;
  }

  clear() {
    try {
      fs.emptyDirSync(this.dbPath);
      return true;
    } catch (e) {
      logger.error(`Error clearing database: ${e.message}`);
      return false;
    }
  }

  // User data functions
  getUserData(userId) {
    return this.get(`user_${userId}`, {
      id: userId,
      balance: 0,
      level: 1,
      xp: 0,
      warns: 0,
      premium: false,
      registered: false,
      createdAt: new Date(),
    });
  }

  setUserData(userId, data) {
    return this.set(`user_${userId}`, data);
  }

  // Group data functions
  getGroupData(groupId) {
    return this.get(`group_${groupId}`, {
      id: groupId,
      settings: {
        antilink: false,
        antispam: false,
        antibot: false,
        welcome: true,
        goodbye: true,
      },
      admins: [],
      createdAt: new Date(),
    });
  }

  setGroupData(groupId, data) {
    return this.set(`group_${groupId}`, data);
  }
}

const db = new Database();

module.exports = db;
