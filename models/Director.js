const dateFns = require('date-fns');
const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    first_name: { type: String, required: true, maxLength: 50 },
    last_name: { type: String, required: true, maxLength: 50 },
    date_of_birth: { type: Date }
});

// Virtual for director's full name
directorSchema.virtual('name').get(function () {
    // To avoid errors in cases where a director does not have either a last name or first name
    // We want to make sure we handle the exception by returning an empty string for that case
    let fullname = '';
    if (this.first_name && this.last_name) {
        fullname = `${this.last_name}, ${this.first_name}`;
    }

    return fullname;
});

// Virtual for director's URL
directorSchema.virtual('url').get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/director/${this._id}`;
});

directorSchema.virtual('date_of_birth_formatted').get(function () {
    return dateFns.format(this.date_of_birth, 'MM/dd/yyy');
});

module.exports = mongoose.model('Director', directorSchema);
