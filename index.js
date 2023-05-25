const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurarea conexiunii la baza de date MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'birthdays'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Middleware for parsing application/x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: false }));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route for processing the form submission
app.post('/submit', (req, res) => {
  const { id, first_name, last_name, email, birth } = req.body;

  // Check if all fields are filled
  if (!id || !first_name || !last_name || !email || !birth) {
    res.send('All fields must be filled!');
    return;
  }

  // Construct the data object for insertion
  const friend = {
    id,
    first_name,
    last_name,
    email,
    birth
  };

  // Execute the insert query in the database
  connection.query('INSERT INTO friends SET ?', friend, (err, result) => {
    if (err) {
      console.error('Error inserting into the database: ', err);
      res.send('Error inserting into the database!');
      return;
    }
    res.send('Data has been successfully added to the database!');
  });
});

// Route for processing the friend deletion
app.post('/delete', (req, res) => {
  const { delete_id } = req.body;

  // Check if the ID field is filled
  if (!delete_id) {
    res.send('The ID field must be filled!');
    return;
  }

  // Execute the delete query in the database
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
