const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL database configuration
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'birthdays',
//   insecureAuth: true
// });

// aws rds configuration
const connection = mysql.createConnection({
      host: 'databasepersons.c647eyfniogy.us-east-1.rds.amazonaws.com',
      user: 'admin',
      password: 'admin123',
      database: 'mydb',
      port: 3306,
      insecureAuth: true
    });

// Connect to the MySQL database
app.get('/', (req, res) => {
    // Perform the database query
    connection.query('SELECT * FROM friends', (err, rows) => {
      if (err) {
        console.error('Error executing the query: ', err);
        res.sendStatus(500);
        return;
      }
  
      // Send the retrieved data to the frontend
      res.send(rows);
    });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
