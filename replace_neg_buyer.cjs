const fs = require('fs');

function replaceNegotiationTabBuyer(filePath) {
  let lines = fs.readFileSync(filePath, 'utf8').split('\n');
  if (!lines.find(l => l.includes('import LiveNegotiationChat'))) {
    lines.splice(1, 0, "import LiveNegotiationChat from '../LiveNegotiationChat';");
  }
  
  let start = lines.findIndex(l => l.includes('{/* OFFERS & NEGOTIATIONS TAB */}'));
  let end = lines.findIndex(l => l.includes('{/* ORDERS & DELIVERY SELECTION TAB */}')) - 1;
  
  if (start !== -1 && end !== -2) {
    lines.splice(start + 1, end - start, 
      '      {activeTab === "negotiations" && (',
      '        <div className="space-y-4">',
      '          <div>',
      '            <h2 className="text-xl font-bold text-gray-900">Live Price Negotiation Timeline</h2>',
      '            <p className="text-xs text-gray-500">Transparent counter-bargaining connected directly with Farmer</p>',
      '          </div>',
      '          <LiveNegotiationChat />',
      '        </div>',
      '      )}'
    );
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Replaced in ' + filePath);
  } else {
    console.log('Could not find start/end bounds in ' + filePath);
  }
}

replaceNegotiationTabBuyer('C:/Users/dhair/OneDrive/Desktop/Emandi/Emandi/src/components/buyer/BuyerDashboard.jsx');
