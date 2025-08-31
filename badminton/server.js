const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const path = require('path');

const ADMIN_PASSWORD = 'secret123';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// --- Game State ---
let gameState = {
  activeCourts: 8, // ✅ track active courts
  courts: Array.from({ length: 8 }, (_, i) => ({
    court: i + 1,
    playerA: `Player A${i + 1}`,
    playerB: `Player B${i + 1}`,
    scoreA: 0,
    scoreB: 0,
    gamesA: 0,
    gamesB: 0
  }))
};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Authentication ---
app.post('/api/auth', (req, res) => {
  return req.body.password === ADMIN_PASSWORD
    ? res.json({ success: true })
    : res.status(401).json({ success: false });
});

// --- Update Court or Global Settings ---
app.post('/api/update', (req, res) => {
  const { password, court, updates } = req.body;
  if (password !== ADMIN_PASSWORD) return res.sendStatus(403);

  if (updates.activeCourts !== undefined) {
    // ✅ update global activeCourts
    gameState.activeCourts = updates.activeCourts;
  }

  if (court) {
    let courtData = gameState.courts.find(c => c.court === court);
    if (!courtData) return res.status(404).json({ error: 'Court not found' });
    Object.assign(courtData, updates);
  }

  broadcast();
  res.sendStatus(200);
});

// --- WebSocket Broadcast ---
function broadcast() {
  const msg = JSON.stringify(gameState);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

wss.on('connection', ws => {
  ws.send(JSON.stringify(gameState));
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Scoreboard display: http://localhost:3000');
  console.log('Scoreboard control: http://localhost:3000/control.html');
  console.log(`Use "${ADMIN_PASSWORD}" as password for login`);

});

