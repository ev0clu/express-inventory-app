const Movie = require('../models/Movie');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
const Status = require('../models/Status');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
    // Get details of movies, movi statuses, directors and genre counts (in parallel)
    const [numMovies, numWatchlistMovieStatus, numWatchedMovieStatus, numDirectors, numGenres] =
        await Promise.all([
            Movie.countDocuments({}).exec(),
            Movie.countDocuments({ status: 'Watchlist' }).exec(),
            Movie.countDocuments({ status: 'Watched' }).exec(),
            Director.countDocuments({}).exec(),
            Genre.countDocuments({}).exec()
        ]);

    res.render('index', {
        title: 'Movie Database Home',
        movie_count: numMovies,
        movie_status_watchlist_count: numWatchlistMovieStatus,
        movie_status_watched_count: numWatchedMovieStatus,
        director_count: numDirectors,
        genre_count: numGenres
    });
});

// Display list of all movies.
exports.movie_list = asyncHandler(async (req, res, next) => {
    const allMovies = await Movie.find({}, 'title director status')
        .sort({ title: 1 })
        .populate('director')
        .exec();

    res.render('movie_list', { title: 'Movie List', movie_list: allMovies });
});

// Display detail page for a specific movie.
exports.movie_detail = asyncHandler(async (req, res, next) => {
    // Get details of movies, movie statuses for specific movie
    const [movie] = await Promise.all([
        Movie.findById(req.params.id).populate('director').populate('genre').exec()
    ]);

    if (movie === null) {
        // No results.
        const err = new Error('Movie not found');
        err.status = 404;
        return next(err);
    }

    res.render('movie_detail', {
        title: movie.title,
        movie: movie
    });
});

// Display movie create form on GET.
exports.movie_create_get = asyncHandler(async (req, res, next) => {
    // Get all directors and genres, which we can use for adding to our movie.
    const [allDirectors, allGenres, allStatuses] = await Promise.all([
        Director.find().sort({ last_name: 1 }).exec(),
        Genre.find().sort({ title: 1 }).exec(),
        Status.find().sort({ title: 1 }).exec()
    ]);

    res.render('movie_form', {
        title: 'Create Movie',
        directors: allDirectors,
        genres: allGenres,
        statuses: allStatuses,
        movie: undefined,
        date: undefined,
        errors: null
    });
});

// Handle movie create on POST.
exports.movie_create_post = [
    // Convert the genre to an array.
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined') req.body.genre = [];
            else req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    // Validate and sanitize fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('director', 'Director must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),
    body('status', 'Status must not be empty.').trim().isLength({ min: 1 }).escape(),
    // Process request after validation and sanitization.

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Movie object with escaped and trimmed data.
        const movie = new Movie({
            title: req.body.title,
            director: req.body.director,
            summary: req.body.summary,
            genre: req.body.genre,
            status: req.body.status,
            date: req.body.date
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all directors and genres for form.
            const [allDirectors, allGenres, allStatuses] = await Promise.all([
                Director.find().exec(),
                Genre.find().exec(),
                Status.find().exec()
            ]);

            // Mark our selected genres as checked.
            for (const genre of allGenres) {
                if (movie.genre.indexOf(genre._id) > -1) {
                    genre.checked = 'true';
                }
            }
            res.render('movie_form', {
                title: 'Create Movie',
                directors: allDirectors,
                genres: allGenres,
                movie: movie,
                statuses: allStatuses,
                date: movie.date,
                errors: errors.array()
            });
        } else {
            // Data from form is valid. Save movie.
            await movie.save();
            res.redirect(movie.url);
        }
    })
];

// Display movie delete form on GET.
exports.movie_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of movie
    const movie = await Movie.findById(req.params.id).exec();

    if (movie === null) {
        // No results.
        res.redirect('/catalog/movies');
    }

    res.render('movie_delete', {
        title: 'Delete Movie',
        movie: movie
    });
});

// Handle movie delete on POST.
exports.movie_delete_post = asyncHandler(async (req, res, next) => {
    await Movie.findByIdAndRemove(req.body.movieid);
    res.redirect('/catalog/movies');
});

// Display movie update form on GET.
exports.movie_update_get = asyncHandler(async (req, res, next) => {
    // Get movie, directors and genres for form.
    const [movie, allDirectors, allGenres, allStatuses] = await Promise.all([
        Movie.findById(req.params.id).populate('director').populate('genre').exec(),
        Director.find().sort({ title: 1 }).exec(),
        Genre.find().sort({ title: 1 }).exec(),
        Status.find().sort({ title: 1 }).exec()
    ]);

    if (movie === null) {
        // No results.
        const err = new Error('Movie not found');
        err.status = 404;
        return next(err);
    }

    // Mark our selected genres as checked.
    for (const genre of allGenres) {
        for (const movie_g of movie.genre) {
            if (genre._id.toString() === movie_g._id.toString()) {
                genre.checked = 'true';
            }
        }
    }

    res.render('movie_form', {
        title: 'Update Movie',
        directors: allDirectors,
        genres: allGenres,
        statuses: allStatuses,
        movie: movie,
        errors: null
    });
});

// Handle movie update on POST.
exports.movie_update_post = [
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
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('director', 'Director must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),
    body('status', 'Status must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('date', 'Date must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Movie object with escaped/trimmed data and old id.
        const movie = new Movie({
            title: req.body.title,
            summary: req.body.summary,
            director: req.body.director,
            genre: typeof req.body.genre === 'undefined' ? [] : req.body.genre,
            status: req.body.status,
            date: req.body.date,
            _id: req.params.id // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all directors and genres for form
            const [allDirectors, allGenres, allStatuses] = await Promise.all([
                Director.find().exec(),
                Genre.find().exec(),
                Status.find().exec()
            ]);

            // Mark our selected genres as checked.
            for (const genre of allGenres) {
                if (movie.genre.indexOf(genre._id) > -1) {
                    genre.checked = 'true';
                }
            }
            res.render('movie_form', {
                title: 'Update Movie',
                directors: allDirectors,
                genres: allGenres,
                movie: movie,
                statuses: allStatuses,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid. Update the record.
            const themovie = await Movie.findByIdAndUpdate(req.params.id, movie, {});
            // Redirect to book detail page.
            res.redirect(themovie.url);
        }
    })
];
