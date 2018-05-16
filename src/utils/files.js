// Aquí se hace un require de fs para trabajar con ficheros.
const fs = require('fs');

// Lee el fichero y lo devuelve en el callback.
function loadMovies(callback) {
  const filePath = __dirname + '/../../data/movies.json';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error', err);
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
}

// Guadra en el fichero lo que se le ha pasado por el parametro movies.
function saveMovies(movies, callback) {
  const filePath = __dirname + '/../../data/movies.json';
  const moviesJSON = JSON.stringify(movies, null, 4);
  fs.writeFile(filePath, moviesJSON, (err, data) => {
    if (err) {
      console.error('Error', err);
      callback(err);
    } else {
      callback();
    }
  });
}

// Exporta ambas funciones para usarlas desde controllers.js
module.exports = {
  loadMovies,
  saveMovies
};


/*function loadMovies(callback) {
   const filePath = __dirname + '/../../../data/movies.json';
   fs.readFile(filePath, (err, data) => {
      if(err) {
         console.error('Error', err);
         callback([]);
      } else {
         callback(JSON.parse(data));
      }
   });
};*/

