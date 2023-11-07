
const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = () => {
    

  // Get all borrowers

    router.get('/', async (req, res) => {
        try {
            const query = 'SELECT * FROM borrowers';
            const result = await db.query(query);
            res.json(result.rows);
          } catch (err) {
            console.error('Error listing borrowers:', err);
            res.sendStatus(500);
          }
    });


// Add a borrower
    router.post('/', async (req, res) => {
        try {
          const { name, email, registeredDate } = req.body;
          const query = 'INSERT INTO borrowers (name, email, registered_date) VALUES ($1, $2, $3)';
          await db.query(query, [name, email, registeredDate]);
          res.sendStatus(201);
        } catch (err) {
          console.error('Error registering borrower:', err);
          res.sendStatus(500);
        }
      });

// Update borrower by id
      router.put('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const { name, email, registeredDate } = req.body;
          const query = 'UPDATE borrowers SET name = $1, email = $2, registered_date = $3 WHERE id = $4';
          await db.query(query, [name, email, registeredDate, id]);
          res.sendStatus(200);
        } catch (err) {
          console.error('Error updating borrower:', err);
          res.sendStatus(500);
        }
      });
    
// Delete a borrower
      router.delete('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const query = 'DELETE FROM borrowers WHERE id = $1';
          await db.query(query, [id]);
          res.sendStatus(200);
        } catch (err) {
          console.error('Error deleting borrower:', err);
          res.sendStatus(500);
        }
      });


  

    return router;
  };