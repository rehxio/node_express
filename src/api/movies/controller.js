// Aquí se hace un require del fichero files.js
const files = require("../../utils/files");

/* Se lee el fichero donde están las películas y lo almacena en movies.
La función de lectura del fichero se encuentra en el files.js*/
let movies;
files.loadMovies(moviesData => movies = moviesData);

// Filtra del array las que tienen la propiedad like a true.
const getLikes = () => {
  return movies.filter(movie => movie.like === true);
}

// Busca en el array la película a la que corresponde el ID que se le ha pasado.
const getMovie = (movieId) => {
  return movies.find(movie => movie.id === movieId);
}

// Muestra el array de películas completo.
const getMovies = () => {
  return movies;
}

// Añade una nueva película al array, asigna un ID consecutivo y lo guarda en el fichero.
const newMovie = (movie, callback) => {
  movie.id = `${movies.length + 1}`;
  movies.push(movie);

  files.saveMovies(movies, err => callback(err, movies));
}

// Actualiza la información de una película del array, buscada por el ID y lo guarda en el fichero.
const updateMovie = (movie, callback) => {
  const movieId = movie.id;
  let moviePosition = movies.findIndex(movie => movie.id === movieId);
  if (moviePosition >= 0) {
    movies[moviePosition] = movie;
  }

  files.saveMovies(movies, err => callback(err, movies));
}

// Borra una película del array seleccionada por el ID y guarda el array en el fichero.
const deleteMovie = (movieId, callback) => {
  const moviePosition = movies.findIndex(movie => movie.id === movieId);
  if (moviePosition >= 0) {
    movies.splice(moviePosition, 1);
  }

  files.saveMovies(movies, err => callback(err, movies));
}

// Esta función pone o quita el like a una película pasada por ID y lo guarda en el fichero.
const setLikeMovie = (movieId, likeValue, callback) => {
  const movie = movies.find(movie => movie.id === movieId);
  if (movie) {
    movie.like = likeValue;
  }

  files.saveMovies(movies, err => callback(err, movies));
}

// Exporta todas las funciones al index.js, aquí sólo está la lógica*/
module.exports = {
  getLikes,
  getMovie,
  getMovies,
  newMovie,
  updateMovie,
  deleteMovie,
  setLikeMovie
};