const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const movies = [
   {name: 'Avengers', id: '1'}, 
   {name: 'DeadPool', id: '2'},
   {name: 'Black Panther', id: '3'}, 
   {name: 'Thor', id: '4'}
];

// Hacer que guarde en un fichero JSON
const escribeFichero = (movie) => {
   for(let i = 0; i < movie.length; i++) {
      let movieJSON = JSON.stringify(movie[i]);
      fs.appendFile("movies.json", movieJSON, err => {
         if(err) {
            console.log('Error', err);
         } else {
            console.log("El fichero se ha escrito correctamente");
         }
      });
   }
}

debugger
// Mostrar todas las peliculas
app.get('/movies', (req,res) => {
   res.json(movies);
});

// Mostrar una película concreta
app.get('/movies/:id', (req,res) => {
   const movieId = req.params.id;
   const movie = movies.find(movie => movie.id === movieId || movie.name === movieId);
   res.json(movie);
});

// Añadir una pelicula nueva
app.post('/movies', (req, res) => {
   const newMovie = req.body;
   newMovie.id = Math.round(Math.random());
   movies.push(newMovie);
   res.json(newMovie);
});

// Actualizar una pelicula
app.put('/movies', (req,res) => {
   /*movies[1].name = req.body.name;
   res.json(movies[1]);*/
   const updateMovie = {
      ...movies[1],
      ...req.body
   };
   res.json(updateMovie);
   movies[1] = updateMovie;
   escribeFichero(movies);
   //res.json(updateMovie);
});

// Eliminar una pelicula concreta
app.delete('/movies/:id', (req,res) => {
   const movieId = req.params.id;
   const moviePosition = movies.findIndex(movie => movie.id === movieId || movie.name === movieId);
   if(moviePosition >= 0) {
      movies.splice(moviePosition, 1)
   }
   res.json(movies);
});

// Dar un like a una pelicula concreta
app.put('/movies/like/:id', (req,res) => {
   const movieId = req.params.id;
   const moviePosition = movies.findIndex(movie => movie.id === movieId || movie.name === movieId);
   movies[moviePosition].like = true;
   res.json(movies);
});

// Quitar un like a una pelicula concreta
app.put('/movies/unlike/:id', (req,res) => {
   const movieId = req.params.id;
   const moviePosition = movies.findIndex(movie => movie.id === movieId || movie.name === movieId);
   movies[moviePosition].like = false;
   res.json(movies);
});

// Muestra películas a las que se les ha dado like TERMINAR ESTE
app.get('/movies/liked', (req,res) => {
   const movie = movies.find(movie => movie.like === true);
   res.json(movie);
});

// /src/api/movies/index.js mover el codigo
app.listen(3000);