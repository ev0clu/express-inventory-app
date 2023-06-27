const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
    const allGenres = await Genre.find().sort({ name: 1 }).exec();
    res.render('genre_list', {
        title: 'Genre List',
        genre_list: allGenres
    });
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
    // Get details of genre and all associated movies (in parallel)
    const [genre, moviesInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Movie.find({ genre: req.params.id }, 'title summary').exec()
    ]);
    if (genre === null) {
        // No results.
        const err = new Error('Genre not found');
        err.status = 404;
        return next(err);
    }

    res.render('genre_detail', {
        title: 'Genre Detail',
        genre: genre,
        genre_movies: moviesInGenre
    });
});

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
    res.render('genre_form', { title: 'Create Genre', errors: null });
};

// Handle Genre create on POST.
exports.genre_create_post = [
    // Validate and sanitize the name field.
    body('name', 'Genre name must contain at least 3 characters')
        .trim()
        .isLength({ min: 3 })
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        const genre = new Genre({ name: req.body.name });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genre_form', {
                title: 'Create Genre',
                genre: genre,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            const genreExists = await Genre.findOne({ name: req.body.name }).exec();
            if (genreExists) {
                // Genre exists, redirect to its detail page.
                res.redirect(genreExists.url);
            } else {
                await genre.save();
                // New genre saved. Redirect to genre detail page.
                res.redirect(genre.url);
            }
        }
    })
];

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of genre and all their movies (in parallel)
    const [genre, allMoviesByGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Movie.find({ genre: req.params.id }, 'title summary').exec()
    ]);

    if (genre === null) {
        // No results.
        res.redirect('/catalog/genres');
    }

    res.render('genre_delete', {
        title: 'Delete Genre',
        genre: genre,
        genre_movies: allMoviesByGenre
    });
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    // Get details of genre and all their movies (in parallel)
    const [genre, allMoviesByGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Movie.find({ director: req.params.id }, 'title summary').exec()
    ]);

    if (allMoviesByGenre.length > 0) {
        // Genre has movies. Render in same way as for GET route.
        res.render('genre_delete', {
            title: 'Delete Genre',
            genre: genre,
            genre_movies: allMoviesByGenre
        });
        return;
    } else {
        // Genre has no movies. Delete object and redirect to the list of director.
        await Genre.findByIdAndRemove(req.body.genreid);
        res.redirect('/catalog/genres');
    }
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
    // Get genres for form.
    const genre = await Genre.findById(req.params.id).exec();

    if (genre === null) {
        // No results.
        const err = new Error('Genre not found');
        err.status = 404;
        return next(err);
    }

    res.render('genre_form', {
        title: 'Update Genre',
        genre: genre,
        errors: null
    });
});

// Handle Genre update on POST.
exports.genre_update_post = [
    // Convert the genre to an array.
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined') {
                req.body.genre = [];
            } else {
                req.body.genre = new Array(req.body.genre);
            }
        }
        next();
    },

    // Validate and sanitize fields.
    body('name', 'Genre must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Genre object with old id.
        const genre = new Genre({
            name: req.body.name,
            _id: req.params.id // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('genre_form', {
                title: 'Update Genre',
                genre: genre,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid. Update the record.
            const thegenre = await Genre.findByIdAndUpdate(req.params.id, genre, {});
            // Redirect to genre detail page.
            res.redirect(thegenre.url);
        }
    })
];
