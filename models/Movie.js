const dateFns = require('date-fns');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    status: {
        type: String,
        required: true,
        enum: ['Watchlist', 'Watched', 'Watch again'],
        default: 'Watchlist'
    },
    date: { type: Date, default: Date.now }
});

// Virtual for movie's URL
movieSchema.virtual('url').get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/movie/${this._id}`;
});

movieSchema.virtual('date_formatted').get(function () {
    return dateFns.format(this.date, 'MM/dd/yyyy HH:mm');
});

movieSchema.virtual('date_html_format').get(function () {
    return dateFns.format(this.date, "yyyy-MM-dd'T'HH:mm");
});

// Export model
module.exports = mongoose.model('Movie', movieSchema);
