const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }]
});

// Virtual for movie's URL
movieSchema.virtual('url').get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/movie/${this._id}`;
});

// Export model
module.exports = mongoose.model('Movie', movieSchema);
