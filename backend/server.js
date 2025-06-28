const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for targets
let targets = [];

// GET all targets
app.get('/api/targets', (req, res) => {
  res.json(targets);
});

// POST new target
app.post('/api/add', (req, res) => {
  const newTarget = {
    id: Date.now(),
    name: req.body.name,
    direction: req.body.direction,
    quantity: parseInt(req.body.quantity, 10) || 1,
    lat: req.body.lat,
    lng: req.body.lng,
    createdAt: new Date().toISOString()
  };
  
  targets.push(newTarget);
  res.status(201).json(newTarget);
});

// DELETE all targets
app.delete('/api/targets/clear', (req, res) => {
  targets = [];
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
