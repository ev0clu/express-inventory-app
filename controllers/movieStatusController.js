const MovieStatus = require('../models/MovieStatus');
const asyncHandler = require('express-async-handler');

// Display list of all MovieStatuses.
exports.movieStatus_list = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: MovieStatus list');
});

// Display detail page for a specific MovieStatus.
exports.movieStatus_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: MovieStatus detail: ${req.params.id}`);
});

// Display MovieStatus create form on GET.
exports.movieStatus_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: MovieStatus create GET');
});

// Handle MovieStatus create on POST.
exports.movieStatus_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: MovieStatus create POST');
});

// Display MovieStatus delete form on GET.
exports.movieStatus_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: MovieStatus delete GET');
});

// Handle MovieStatus delete on POST.
exports.movieStatus_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: MovieStatus delete POST');
});

// Display MovieStatus update form on GET.
exports.movieStatus_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: MovieStatus update GET');
});

// Handle MovieStatus update on POST.
exports.movieStatus_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: MovieStatus update POST');
});
