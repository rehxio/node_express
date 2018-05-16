// Este es el require al router dentro del modulo de express y también añade el fichero controllers.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Todas las funciones tienen la lógica en controllers.js

// Muestra las películas a las que se le ha dado like
router.get('/like', (req, res) => {
  res.json(controller.getLikes());
});

// Muestra una película concreta pasando el ID
router.get('/:id', (req, res) => {
  res.json(controller.getMovie(req.params.id));
});

// Muestra todas las películas
router.get('/', (req, res) => {
  res.json(controller.getMovies());
});

// Añade una película nueva
router.post('/', (req, res) => {
  controller.newMovie(req.body, (err, movies) => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

// Actualiza la información de una película
router.put('/', (req, res) => {
  controller.updateMovie(req.body, (err, movies) => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

// Elimina una película concreta pasando el ID
router.delete('/:id', (req, res) => {
  controller.deleteMovie(req.params.id, (err, movies) => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

// Da like a una película concreta pasando el ID
router.post('/like/:id', (req, res) => {
  controller.setLikeMovie(req.params.id, true, (err, movies) => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

// Quita el like dado a una película concreta pasando el ID
router.delete('/like/:id', (req, res) => {
  controller.setLikeMovie(req.params.id, false, (err, movies) => {
    if (err) {
      res.error(err);
    } else {
      res.json(movies);
    }
  });
});

// Exporta router al server.js
module.exports = router;