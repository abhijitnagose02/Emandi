const fs = require('fs');
const file = 'C:/Users/dhair/OneDrive/Desktop/Emandi/Emandi/src/components/farmer/FarmerDashboard.jsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');
lines.splice(2, 0, "import FarmerDashboardOverview from './FarmerDashboardOverview';");

let startIdx = lines.findIndex(l => l.includes('{activeTab === "dashboard" && ('));
let endIdx = startIdx;
let openBraces = 0;
let foundContent = false;

for(let i=startIdx; i<lines.length; i++) {
  if (lines[i].includes('{')) openBraces += (lines[i].match(/\{/g) || []).length;
  if (lines[i].includes('}')) openBraces -= (lines[i].match(/\}/g) || []).length;
  if (lines[i].includes('(')) openBraces += (lines[i].match(/\(/g) || []).length;
  if (lines[i].includes(')')) openBraces -= (lines[i].match(/\)/g) || []).length;
  if (i > startIdx) foundContent = true;
  if (foundContent && openBraces === 0) {
    endIdx = i;
    break;
  }
}

lines.splice(startIdx, endIdx - startIdx + 1, 
  '      {activeTab === "dashboard" && (', 
  '        <FarmerDashboardOverview ', 
  '          setActiveTab={setActiveTab} ', 
  '          setShowCreateModal={setShowCreateModal}', 
  '        />', 
  '      )}'
);

fs.writeFileSync(file, lines.join('\n'));
console.log('Replaced from ' + startIdx + ' to ' + endIdx);
