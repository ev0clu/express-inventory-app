const Director = require('../models/Director');
const Movie = require('../models/Movie');
const asyncHandler = require('express-async-handler');

// Display list of all Director.
exports.director_list = asyncHandler(async (req, res, next) => {
    const allDirectors = await Director.find().sort({ last_name: 1 }).exec();
    res.render('director_list', {
        title: 'Director List',
        director_list: allDirectors
    });
});

// Display detail page for a specific Director.
exports.director_detail = asyncHandler(async (req, res, next) => {
    // Get details of director and all their movies (in parallel)
    const [director, allMoviesByDirector] = await Promise.all([
        Director.findById(req.params.id).exec(),
        Movie.find({ director: req.params.id }, 'title summary').exec()
    ]);

    if (director === null) {
        // No results.
        const err = new Error('Director not found');
        err.status = 404;
        return next(err);
    }

    res.render('director_detail', {
        title: 'Director Detail',
        director: director,
        director_movies: allMoviesByDirector
    });
});

// Display Director create form on GET.
exports.director_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Director create GET');
});

// Handle Director create on POST.
exports.director_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Director create POST');
});

// Display Director delete form on GET.
exports.director_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Director delete GET');
});

// Handle Director delete on POST.
exports.director_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Director delete POST');
});

// Display Director update form on GET.
exports.director_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Director update GET');
});

// Handle Director update on POST.
exports.director_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Director update POST');
});
