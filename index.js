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

require('dotenv').config();
const bot = require('./lib/bot');
const { banner } = require('./utils/banner');

async function main() {
  console.clear();
  banner();
  await bot();
}

main().catch(err => {
  console.error('❌ Fatal Error:', err.message);
  process.exit(1);
});
