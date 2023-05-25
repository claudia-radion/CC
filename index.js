const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurarea conexiunii aws rds
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

// Start the server
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
