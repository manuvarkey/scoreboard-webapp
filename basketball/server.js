const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ADMIN_PASSWORD = 'secret123';
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Game state
let gameState = {
  teamAName: 'TEAM A',
  teamBName: 'TEAM B',
  scoreA: 0,
  scoreB: 0,
  foulsA: 0,
  foulsB: 0,
  timer: 600,
  running: false,
  period: 1,
  logoA: '/images/team_a.png',
  logoB: '/images/team_b.png',
  video: '/images/loop.mp4'
};

// ✅ Ensure uploads directory exists outside snapshot
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadDir));

// Multer setup
const upload = multer({ dest: uploadDir });
const uploadVideo = multer({ storage: multer.memoryStorage() });

// Routes
app.post('/api/auth', (req, res) => {
  return req.body.password === ADMIN_PASSWORD
    ? res.json({ success: true })
    : res.status(401).json({ success: false });
});

app.post('/api/update', (req, res) => {
  const { password, ...updates } = req.body;
  if (password !== ADMIN_PASSWORD) return res.sendStatus(403);
  Object.assign(gameState, updates);
  broadcast();
  res.sendStatus(200);
});

// ✅ Upload logo and store URL in gameState
app.post('/api/upload-logo', upload.single('logo'), (req, res) => {
  const { team, password } = req.body;
  if (password !== ADMIN_PASSWORD) return res.sendStatus(403);

  const url = `/uploads/${req.file.filename}`;
  if (team === 'A') gameState.logoA = url;
  else if (team === 'B') gameState.logoB = url;

  broadcast();
  res.json({ url });
});

// ✅ Upload loop video and store path in gameState
app.post('/api/upload-video', uploadVideo.single('video'), (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) return res.sendStatus(403);

  const ext = path.extname(req.file.originalname) || '.mp4';
  const fileName = `loop-${Date.now()}${ext}`;
  const outPath = path.join(uploadDir, fileName);
  const publicPath = `/uploads/${fileName}`;

  fs.writeFile(outPath, req.file.buffer, err => {
    if (err) return res.status(500).json({ success: false, error: 'File save failed' });

    gameState.video = publicPath;
    broadcast();
    res.json({ success: true, path: publicPath });
  });
});

// Timer loop
setInterval(() => {
  if (gameState.running && gameState.timer > 0) {
    gameState.timer--;
    broadcast();
  }
}, 1000);

// Broadcast helper
function broadcast() {
  const msg = JSON.stringify(gameState);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
}

wss.on('connection', ws => ws.send(JSON.stringify(gameState)));

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Scoreboard display: http://localhost:3000');
  console.log('Scoreboard control: http://localhost:3000/control.html');
  console.log(`Use "${ADMIN_PASSWORD}" as password for login`);
});
