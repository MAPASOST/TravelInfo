const eim = require('electron-icon-maker');
const path = require('path');

const options = {
  input: path.join(__dirname, '..', 'assets', 'icon.svg'),
  output: path.join(__dirname, '..', 'assets')
};

eim(options)
  .then(() => {
    console.log('✅ Icons generated successfully!');
    console.log('Generated files:');
    console.log('  - assets/icon.ico (Windows)');
    console.log('  - assets/icon.icns (macOS)');
    console.log('  - assets/icon.png (Linux)');
  })
  .catch(err => {
    console.error('❌ Error generating icons:', err);
    process.exit(1);
  });
