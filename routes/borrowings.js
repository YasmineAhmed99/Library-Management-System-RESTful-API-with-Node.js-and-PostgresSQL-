
const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = () => {
    
    // Borrower check out a book
    router.post('/', async (req, res) => {
        try {
          const { bookId, borrowerId, borrowDate } = req.body;
          const query = 'INSERT INTO borrowings (book_id, borrower_id, borrow_date) VALUES ($1, $2, $3)';
          await db.query(query, [bookId, borrowerId, borrowDate]);
          res.sendStatus(201);
        } catch (err) {
          console.error('Error checking out a book:', err);
          res.sendStatus(500);
        }
      });


  // Get books borrowed books by a borrower
      router.get('/borrower/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const query = 'SELECT b.* FROM books b INNER JOIN borrowings bo ON bo.book_id = b.id WHERE bo.borrower_id = $1 AND bo.return_date IS NULL';
          const result = await db.query(query, [id]);
          res.json(result.rows);
        } catch (err) {
          console.error('Error getting borrowed books:', err);
          res.sendStatus(500);
        }
      });

      // return a book by date
      router.put('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const { returnDate } = req.body;
          const query = 'UPDATE borrowings SET return_date = $1 WHERE id = $2';
          await db.query(query, [returnDate, id]);
          res.sendStatus(200);
        } catch (err) {
          console.error('Error returning a book:', err);
          res.sendStatus(500);
        }
      });




  

    return router;
  };