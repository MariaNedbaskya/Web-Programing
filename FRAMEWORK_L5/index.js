const app = require('./app')();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  if (req.headers['authorization'] !== 'secret-token') {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/users/:id', (req, res) => {
  res.json({ userId: req.params.id, query: req.query });
});

app.post('/users', (req, res) => {
  res.status(201).json({ created: true, data: req.body });
});

app.put('/users/:id', (req, res) => {
  res.json({ updated: true, id: req.params.id, data: req.body });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});