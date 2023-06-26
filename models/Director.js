const dateFns = require('date-fns');
const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    first_name: { type: String, required: true, maxLength: 50 },
    last_name: { type: String, required: true, maxLength: 50 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date }
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
    let date_of_death_string = '';
    if (this.date_of_birth) {
        date_of_death_string = dateFns.format(this.date_of_birth, 'yyy/MM/dd');
    }
    return date_of_death_string;
});

directorSchema.virtual('date_of_death_formatted').get(function () {
    let date_of_death_string = '';
    if (this.date_of_death) {
        date_of_death_string = dateFns.format(this.date_of_death, 'yyy/MM/dd');
    }
    return date_of_death_string;
});

module.exports = mongoose.model('Director', directorSchema);
