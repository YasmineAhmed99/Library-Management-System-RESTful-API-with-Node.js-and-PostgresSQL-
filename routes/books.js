
const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = () => {
    
  //Get all books in databse
    router.get('/', async (req, res) => {
        try {
            const query = 'SELECT * FROM books';
            const result = await db.query(query);
            res.json(result.rows);
          } catch (err) {
            console.error('Error listing books:', err);
            res.sendStatus(500);
          }
    });
 
    // Add a book in database
    router.post('/', async (req, res) => {
        try {
          const { title, author, isbn, quantity, shelfLocation } = req.body;
          console.log('Received book details:', title, author, isbn, quantity, shelfLocation);
      
          const query = 'INSERT INTO books (title, author, isbn, quantity, shelf_location) VALUES ($1, $2, $3, $4, $5)';
          await db.query(query, [title, author, isbn, quantity, shelfLocation]);
          
          console.log('Book added successfully');
          res.sendStatus(201);
        } catch (err) {
          console.error('Error adding book:', err);
          res.sendStatus(500);
        }
      });



      // Update book by id
    router.put('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const { title, author, isbn, quantity, shelfLocation } = req.body;
          const query = 'UPDATE books SET title = $1, author = $2, isbn = $3, quantity = $4, shelf_location = $5 WHERE id = $6';
          await db.query(query, [title, author, isbn, quantity, shelfLocation, id]);
          res.sendStatus(200);
        } catch (err) {
          console.error('Error updating book:', err);
          res.sendStatus(500);
        }
      });


      // Delete a book by id
      router.delete('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const query = 'DELETE FROM books WHERE id = $1';
          await db.query(query, [id]);
          res.sendStatus(200);
        } catch (err) {
          console.error('Error deleting book:', err);
          res.sendStatus(500);
        }
      });


      // search for a books using title or author ot isbn
    router.get('/search', async (req, res) => {
        try {
          const { query } = req.query;
          const searchQuery = 'SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1 OR isbn ILIKE $1';
          const result = await db.query(searchQuery, [`%${query}%`]);
          res.json(result.rows);
       } catch (err) {
          console.error('Error searching for book:', err);
          res.sendStatus(500);
        }
      });

    return router;
  };