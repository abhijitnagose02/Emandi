const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('C:/Users/dhair/OneDrive/Desktop/Emandi/Emandi/src/components', function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    let newContent = content
      .replace(/amber-/g, 'emerald-')
      .replace(/blue-/g, 'emerald-')
      .replace(/orange-/g, 'emerald-')
      .replace(/indigo-/g, 'emerald-')
      .replace(/purple-/g, 'emerald-');
      
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Updated: ' + filePath);
    }
  }
});
