const Director = require('../models/Director');
const asyncHandler = require('express-async-handler');

// Display list of all Director.
exports.director_list = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Director list');
});

// Display detail page for a specific Director.
exports.director_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Director detail: ${req.params.id}`);
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
