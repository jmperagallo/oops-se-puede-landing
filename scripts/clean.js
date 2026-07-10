// scripts/clean.js
const fs = require('fs');
const path = require('path');

const directories = [
  '.next',
  'node_modules/.cache',
];

directories.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    console.log(`🗑️ Eliminando: ${dirPath}`);
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
});

console.log('✅ Caché limpiada correctamente');