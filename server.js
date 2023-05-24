const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

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

app.use(bodyParser.json());

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

// Insert a new row into the table
app.post('/friends', (req, res) => {
    // const { firstName, lastName, birth } = req.body;
  
    const query = 'INSERT INTO friends VALUES ('+ req.body.id + ',\"' + req.body.firstName + '\",\"' + req.body.lastName + '\",\"' + req.body.email + '\",\"' + req.body.birth + '\")';
    // const values = [id, firstName, lastName, birth];
  
    connection.query(query, (err, result) => {
      if (err) {
        console.error('Error executing the query: ', err);
        res.sendStatus(500);
        return;
      }
  
      console.log('New row inserted!');
      res.sendStatus(201);
    });
  });

// Delete a row from the table
app.delete('/friends/:id', (req, res) => {
    const friendId = req.params.id;
  
    const query = 'DELETE FROM friends WHERE id = ?';
    const values = [friendId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing the query: ', err);
        res.sendStatus(500);
        return;
      }
  
      if (result.affectedRows === 0) {
        // No rows were deleted, friendId may not exist
        res.sendStatus(404);
      } else {
        console.log('Row deleted successfully!');
        res.sendStatus(200);
      }
    });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });