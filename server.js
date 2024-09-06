//****/host
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

//** ITEMS */
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

//******/
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//*****/
app.get('/', (req, res) => {
  res.render('index', { items });
});

//****/
app.get('/create', (req, res) => {
  res.render('edit', { item: null });
});

//*****/
app.post('/create', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.redirect('/');
});

//****/
app.get('/edit/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.render('edit', { item });
});

//*****/
app.post('/edit/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  item.name = req.body.name;
  res.redirect('/');
});

//*****/
app.post('/delete/:id', (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.redirect('/');
});

//*****/ server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
