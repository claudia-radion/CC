const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
      host: 'databasepersons.c647eyfniogy.us-east-1.rds.amazonaws.com',
      user: 'admin',
      password: 'admin123',
      database: 'mydb',
      port: 3306,
      insecureAuth: true
    });

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const { id, first_name, last_name, email, birth } = req.body;

  if (!id || !first_name || !last_name || !email || !birth) {
    res.send('All fields must be filled!');
    return;
  }

  const friend = {
    id,
    first_name,
    last_name,
    email,
    birth
  };

  connection.query('INSERT INTO friends SET ?', friend, (err, result) => {
    if (err) {
      console.error('Error inserting into the database: ', err);
      res.send('Error inserting into the database!');
      return;
    }
    res.send('Data has been successfully added to the database!');
  });
});

app.post('/delete', (req, res) => {
  const { delete_id } = req.body;

  if (!delete_id) {
    res.send('The ID field must be filled!');
    return;
  }

  connection.query('DELETE FROM friends WHERE id = ?', delete_id, (err, result) => {
    if (err) {
      console.error('Error deleting from the database: ', err);
      res.send('Error deleting from the database!');
      return;
    }
    res.send('Friend has been successfully deleted from the database!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
