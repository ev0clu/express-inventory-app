const dateFns = require('date-fns');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieStatusSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true }, // reference to the associated movie
    status: {
        type: String,
        required: true,
        enum: ['Watchlist', 'Watched', 'Watch again'],
        default: 'Watchlist'
    },
    due_date: { type: Date, default: Date.now }
});

// Virtual for movie status's URL
movieStatusSchema.virtual('url').get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/moviestatus/${this._id}`;
});

movieStatusSchema.virtual('due_date_formatted').get(function () {
    return dateFns.format(this.due_date, 'MM/dd/yyy HH:mm');
});

// Export model
module.exports = mongoose.model('MovieStatus', movieStatusSchema);
