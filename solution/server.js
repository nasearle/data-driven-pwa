const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

let db = new sqlite3.Database('database.sqlite');

// This serves static files from the specified directory
app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/getAll', (req, res) => {
  db.all('SELECT * FROM projects', (err, rows) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(rows);
  });
});

app.post('/api/update', (req, res) => {
  let title = req.body.title;
  let notes = req.body.notes;

  // db.run automatically sanitizes inputs
  db.run('UPDATE projects SET notes = ? WHERE title = ?', [notes, title], (err) => {
    if (this.changes == 0 || err) {
      res.status(500).send('Database was not updated');
      return;
    }
    res.send('success!');
  });
});

// app.post('/api/add', (req, res) => {
//   let title = req.body.title || '';
//   let city = req.body.city || '';
//   let country = req.body.country || '';
//   let due = req.body.due || '';
//   let poc = req.body.poc || '';
//   let notes = req.body.notes || '';
//
//   db.run("INSERT INTO projects VALUES (?,?,?,?,?,?)", [title, city, country, due, poc, notes]);
//
// })

const server = app.listen(8081, () => {

  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
