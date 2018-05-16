// Este es el require al modulo de express.
const express = require('express');
const app = express();
debugger
// Se declara donde se encuentra el moviesRouter
const moviesRouter = require('./src/api/movies');

// Aquí se declara que tiene que usar json y que tiene que usar el moviesRouter cuando se acceda a /movies
app.use(express.json());
app.use('/movies', moviesRouter);

// Pone en escucha el puerto 3000 y muestra el mensaje por consola.
app.listen(3000, () => {
  console.log('Ready on port 3000!');
});