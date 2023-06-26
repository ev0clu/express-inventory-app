const Movie = require('../models/Movie');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
const MovieStatus = require('../models/MovieStatus');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    // Get details of movies, movi statuses, directors and genre counts (in parallel)
    const [numMovies, numWatchlistMovieStatus, numWatchedMovieStatus, numDirectors, numGenres] =
        await Promise.all([
            Movie.countDocuments({}).exec(),
            MovieStatus.countDocuments({ status: 'Watchlist' }).exec(),
            MovieStatus.countDocuments({ status: 'Watched' }).exec(),
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
    const allMovies = await Movie.find({}, 'title director')
        .sort({ title: 1 })
        .populate('director')
        .exec();

    res.render('movie_list', { title: 'Movie List', movie_list: allMovies });
});

// Display detail page for a specific movie.
exports.movie_detail = asyncHandler(async (req, res, next) => {
    // Get details of books, book instances for specific book
    const [movie, movieStatuses] = await Promise.all([
        Movie.findById(req.params.id).populate('director').populate('genre').exec(),
        MovieStatus.find({ movie: req.params.id }).exec()
    ]);

    if (movie === null) {
        // No results.
        const err = new Error('Book not found');
        err.status = 404;
        return next(err);
    }

    res.render('movie_detail', {
        title: movie.title,
        movie: movie,
        movie_statuses: movieStatuses
    });
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
