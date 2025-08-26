const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample in-memory data store
let items = [];

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Create new item
app.post('/api/items', (req, res) => {
  const item = { id: Date.now(), text: req.body.text || 'New item' };
  items.push(item);
  res.status(201).json(item);
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id == id);
  if (index !== -1) {
    items[index].text = req.body.text || items[index].text;
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id != id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
