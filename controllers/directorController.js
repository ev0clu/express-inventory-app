const Director = require('../models/Director');
const Movie = require('../models/Movie');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
exports.director_create_get = (req, res, next) => {
    res.render('director_form', { title: 'Create Director', errors: null });
};

// Handle Director create on POST.
exports.director_create_post = [
    // Validate and sanitize fields.
    body('first_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('First name must be specified.'),
    body('last_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Last name must be specified.'),
    body('date_of_birth', 'Invalid date of birth')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('date_of_death', 'Invalid date of death')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Director object with escaped and trimmed data
        const director = new Director({
            first_name: req.body.first_name,
            last_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('director_form', {
                title: 'Create Director',
                director: director,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid.
            // Save director.
            await director.save();
            // Redirect to new director record.
            res.redirect(director.url);
        }
    })
];

// Display Director delete form on GET.
exports.director_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of director and all their movies (in parallel)
    const [director, allMoviesByDirector] = await Promise.all([
        Director.findById(req.params.id).exec(),
        Movie.find({ director: req.params.id }, 'title summary').exec()
    ]);

    if (director === null) {
        // No results.
        res.redirect('/catalog/directors');
    }

    res.render('director_delete', {
        title: 'Delete Director',
        director: director,
        director_movies: allMoviesByDirector
    });
});

// Handle Director delete on POST.
exports.director_delete_post = asyncHandler(async (req, res, next) => {
    // Get details of director and all their movies (in parallel)
    const [director, allMoviesByDirector] = await Promise.all([
        Director.findById(req.params.id).exec(),
        Movie.find({ director: req.params.id }, 'title summary').exec()
    ]);

    if (allMoviesByDirector.length > 0) {
        // Director has movies. Render in same way as for GET route.
        res.render('director_delete', {
            title: 'Delete Director',
            director: director,
            director_movies: allMoviesByDirector
        });
        return;
    } else {
        // Director has no books. Delete object and redirect to the list of director.
        await Director.findByIdAndRemove(req.body.directorid);
        res.redirect('/catalog/directors');
    }
});

// Display Director update form on GET.
exports.director_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Director update GET');
});

// Handle Director update on POST.
exports.director_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Director update POST');
});
