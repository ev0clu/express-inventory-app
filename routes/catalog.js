const express = require('express');
const router = express.Router();

// Require controller modules.
const movie_controller = require('../controllers/movieController');
const director_controller = require('../controllers/directorController');
const genre_controller = require('../controllers/genreController');
const movieStatus_controller = require('../controllers/movieStatusController');

/// MOVIE ROUTES ///

// GET catalog home page.
router.get('/', movie_controller.index);

// GET request for creating a Movie. NOTE This must come before routes that display Movie (uses id).
router.get('/movie/create', movie_controller.movie_create_get);

// POST request for creating Movie.
router.post('/movie/create', movie_controller.movie_create_post);

// GET request to delete Movie.
router.get('/movie/:id/delete', movie_controller.movie_delete_get);

// POST request to delete Movie.
router.post('/movie/:id/delete', movie_controller.movie_delete_post);

// GET request to update Movie.
router.get('/movie/:id/update', movie_controller.movie_update_get);

// POST request to update Movie.
router.post('/movie/:id/update', movie_controller.movie_update_post);

// GET request for one Movie.
router.get('/movie/:id', movie_controller.movie_detail);

// GET request for list of all Movie items.
router.get('/movies', movie_controller.movie_list);

/// DIRECTOR ROUTES ///

// GET request for creating Director. NOTE This must come before route for id (i.e. display director).
router.get('/director/create', director_controller.director_create_get);

// POST request for creating Director.
router.post('/director/create', director_controller.director_create_post);

// GET request to delete Director.
router.get('/director/:id/delete', director_controller.director_delete_get);

// POST request to delete Director.
router.post('/director/:id/delete', director_controller.director_delete_post);

// GET request to update Director.
router.get('/director/:id/update', director_controller.director_update_get);

// POST request to update Director.
router.post('/director/:id/update', director_controller.director_update_post);

// GET request for one Director.
router.get('/director/:id', director_controller.director_detail);

// GET request for list of all Director.
router.get('/directors', director_controller.director_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

/// MOVIESTATUSES ROUTES ///

// GET request for creating a MovieStatus. NOTE This must come before route that displays MovieStatus (uses id).
router.get('/moviestatus/create', movieStatus_controller.movieStatus_create_get);

// POST request for creating MovieStatus.
router.post('/moviestatus/create', movieStatus_controller.movieStatus_create_post);

// GET request to delete MovieStatus.
router.get('/moviestatus/:id/delete', movieStatus_controller.movieStatus_delete_get);

// POST request to delete MovieStatus.
router.post('/moviestatus/:id/delete', movieStatus_controller.movieStatus_delete_post);

// GET request to update MovieStatus.
router.get('/moviestatus/:id/update', movieStatus_controller.movieStatus_update_get);

// POST request to update MovieStatus.
router.post('/moviestatus/:id/update', movieStatus_controller.movieStatus_update_post);

// GET request for one MovieStatus.
router.get('/moviestatus/:id', movieStatus_controller.movieStatus_detail);

// GET request for list of all MovieStatus.
router.get('/moviestatuses', movieStatus_controller.movieStatus_list);

module.exports = router;
