// #! /usr/bin/env node

console.log(
    'This script populates some test Movies, Directors, Genres and MovieInstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Movie = require('./models/Movie');
const Director = require('./models/Director');
const Genre = require('./models/Genre');
const Status = require('./models/Status');

const genres = [];
const directors = [];
const movies = [];
const statuses = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    await createGenres();
    await createDirectors();
    await createMovies();
    await createStatuses();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Comdey genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name) {
    const genre = new Genre({ name: name });
    await genre.save();
    genres[index] = genre;
    console.log(`Added genre: ${name}`);
}

async function statusCreate(index, name) {
    const status = new Status({ name: name });
    await status.save();
    statuses[index] = status;
    console.log(`Added status: ${name}`);
}

async function directorCreate(index, first_name, last_name, date_of_birth, date_of_death) {
    const directorDetail = { first_name: first_name, last_name: last_name };
    if (date_of_birth != false) directorDetail.date_of_birth = date_of_birth;
    if (date_of_death != false) directorDetail.date_of_death = date_of_death;

    const director = new Director(directorDetail);

    await director.save();
    directors[index] = director;
    console.log(`Added director: ${first_name} ${last_name}`);
}

async function movieCreate(index, title, summary, director, genre, status, date) {
    const movieDetail = {
        title: title,
        summary: summary,
        director: director
    };
    if (genre != false) movieDetail.genre = genre;
    if (status != false) movieDetail.status = status;
    if (date != false) movieDetail.date = date;

    const movie = new Movie(movieDetail);
    await movie.save();
    movies[index] = movie;
    console.log(`Added movie: ${title}`);
}

async function createGenres() {
    console.log('Adding genres');
    await Promise.all([
        genreCreate(0, 'Comedy'),
        genreCreate(1, 'Crime'),
        genreCreate(2, 'Action'),
        genreCreate(3, 'Adventure'),
        genreCreate(4, 'Drama'),
        genreCreate(5, 'Sci-Fi'),
        genreCreate(6, 'Western')
    ]);
}

async function createStatuses() {
    console.log('Adding statuses');
    await Promise.all([
        statusCreate(0, 'Watched'),
        statusCreate(1, 'Watchlist'),
        statusCreate(2, 'Watch again')
    ]);
}

async function createDirectors() {
    console.log('Adding directors');
    await Promise.all([
        directorCreate(0, 'Martin', 'Scorsese', '1942-11-17', false),
        directorCreate(1, 'Denis', 'Villeneuve', '1967-10-03', false),
        directorCreate(2, 'Quentin', 'Tarantino', '1963-03-27', false),
        directorCreate(3, 'Christopher', 'Nolan', '1970-07-30', false),
        directorCreate(4, 'Sergio', 'Leone', '1929-01-03', '1989-04-30')
    ]);
}

async function createMovies() {
    console.log('Adding movies');
    await Promise.all([
        movieCreate(
            0,
            'The Wolf of Wall Street',
            'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
            directors[0],
            [genres[0], genres[1]],
            'Watched',
            false
        ),
        movieCreate(
            1,
            'Dune: Part One',
            `A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.`,
            directors[1],
            [genres[2], genres[3], genres[4]],
            false,
            false
        ),
        movieCreate(
            2,
            'Once Upon a Time in Hollywood',
            `A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.`,
            directors[2],
            [genres[0], genres[4]],
            false,
            false
        ),
        movieCreate(
            3,
            'Inception',
            'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
            directors[3],
            [genres[2], genres[3], genres[5]],
            'Watchlist',
            false
        ),
        movieCreate(
            4,
            'Interstellar',
            'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
            directors[3],
            [genres[3], genres[4], genres[5]],
            'Watched',
            false
        ),
        movieCreate(
            5,
            'The Good, the Bad and the Ugly',
            'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
            directors[4],
            [genres[3], genres[6]],
            'Watch again',
            false
        )
    ]);
}
