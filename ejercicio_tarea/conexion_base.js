const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/gestion_libros', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

// Modelos
const Author = require('./models/Author');
const Book = require('./models/Book');

// Crear un autor 
app.post('/autores', async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).send(`Autor creado con ID: ${author.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});


// Listar autores 

app.get('/autores', async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Crear un libro
app.post('/libros', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(`Libro creado con ID: ${book.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Listar libros
app.get('/libros', async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'name');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});

