
const express = require('express');

const app = express();

const db = require('./db');

app.use(express.json());


const booksRoutes = require('./routes/books')();
 const borrowersRoutes = require('./routes/borrowers')();
const borrowingsRoutes = require('./routes/borrowings')();

app.use('/books', booksRoutes);
 app.use('/borrowers', borrowersRoutes);
app.use('/borrowings', borrowingsRoutes);



const port = process.env.PORT || 3000;

app.get("/", (req,res) =>{
    res.send("hello world");
    
 });

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});





