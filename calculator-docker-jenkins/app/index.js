const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function parseNums(a, b) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (Number.isNaN(x) || Number.isNaN(y)) return null;
  return { x, y };
}

app.get('/api/add', (req, res) => {
  const p = parseNums(req.query.a, req.query.b);
  if (!p) return res.status(400).json({ error: 'invalid numbers' });
  res.json({ result: p.x + p.y });
});

app.get('/api/sub', (req, res) => {
  const p = parseNums(req.query.a, req.query.b);
  if (!p) return res.status(400).json({ error: 'invalid numbers' });
  res.json({ result: p.x - p.y });
});

app.get('/api/mul', (req, res) => {
  const p = parseNums(req.query.a, req.query.b);
  if (!p) return res.status(400).json({ error: 'invalid numbers' });
  res.json({ result: p.x * p.y });
});

app.get('/api/div', (req, res) => {
  const p = parseNums(req.query.a, req.query.b);
  if (!p) return res.status(400).json({ error: 'invalid numbers' });
  if (p.y === 0) return res.status(400).json({ error: 'division by zero' });
  res.json({ result: p.x / p.y });
});

app.listen(port, () => {
  console.log(`Calculator app listening on port ${port}`);
});