const Movie = require('../models/Movie');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
});

// Display list of all movies.
exports.movie_list = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Movie list');
});

// Display detail page for a specific movie.
exports.movie_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Movie detail: ${req.params.id}`);
});

// Display movie create form on GET.
exports.movie_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Movie create GET');
});

// Handle movie create on POST.
exports.movie_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Movie create POST');
});

// Display movie delete form on GET.
exports.movie_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Movie delete GET');
});

// Handle movie delete on POST.
exports.movie_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Movie delete POST');
});

// Display movie update form on GET.
exports.movie_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Movie update GET');
});

// Handle movie update on POST.
exports.movie_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Movie update POST');
});
