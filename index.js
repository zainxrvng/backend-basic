import express from "express";
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory "database"
let items = [];
let nextId = 1;

//  CREATE
app.post('/items', (req, res) => {
  const newItem = { id: nextId++, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

//  READ ALL
app.get('/items', (req, res) => {
  res.json(items);
});

//  READ ONE
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

//  UPDATE
app.patch('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  
  // Prevent overwriting the ID
  const { id: _, ...updateData } = req.body;
  Object.assign(item, updateData);
  res.json(item);
});

//  DELETE
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  
  items.splice(index, 1);
  res.status(204).send(); 
});

app.listen(PORT, () => {
  console.log( `Server running at http://localhost:${PORT}`);
});
