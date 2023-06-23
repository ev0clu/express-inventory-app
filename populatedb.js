// #! /usr/bin/env node

console.log(
    'This script populates some test Movies, Directors, Genres and MovieInstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Movie = require('./models/Movie');
const Director = require('./models/Director');
const Genre = require('./models/Genre');
const MovieStatus = require('./models/MovieStatus');

const genres = [];
const directors = [];
const movies = [];
const movieStatuses = [];

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
    await createMovieStatuses();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
}

async function genreCreate(name) {
    const genre = new Genre({ name: name });
    await genre.save();
    genres.push(genre);
    console.log(`Added genre: ${name}`);
}

async function directorCreate(first_name, last_name, date_of_birth) {
    const directorDetail = { first_name: first_name, last_name: last_name };
    if (date_of_birth != false) directorDetail.date_of_birth = date_of_birth;

    const director = new Director(directorDetail);

    await director.save();
    directors.push(director);
    console.log(`Added director: ${first_name} ${last_name}`);
}

async function movieCreate(title, summary, director, genre) {
    const movieDetail = {
        title: title,
        summary: summary,
        director: director,
        genre: genre
    };
    if (genre != false) movieDetail.genre = genre;

    const movie = new Movie(movieDetail);
    await movie.save();
    movies.push(movie);
    console.log(`Added movie: ${title}`);
}

async function movieStatusCreate(movie, due_date, status) {
    const movieStatusDetail = {
        movie: movie
    };
    if (due_date != false) movieStatusDetail.due_date = due_date;
    if (status != false) movieStatusDetail.status = status;

    const movieStatus = new MovieStatus(movieStatusDetail);
    await movieStatus.save();
    movieStatuses.push(movieStatus);
    console.log(`Added movie status: ${status}`);
}

async function createGenres() {
    console.log('Adding genres');
    await Promise.all([
        genreCreate('Comedy'),
        genreCreate('Crime'),
        genreCreate('Action'),
        genreCreate('Adventure'),
        genreCreate('Drama'),
        genreCreate('Sci-Fi'),
        genreCreate('Western')
    ]);
}

async function createDirectors() {
    console.log('Adding directors');
    await Promise.all([
        directorCreate('Martin', 'Scorsese', '1942-11-17', false),
        directorCreate('Denis', 'Villeneuve', '1967-10-03', false),
        directorCreate('Quentin', 'Tarantino', '1963-03-27', false),
        directorCreate('Christopher', 'Nolan', '1970-07-30', false),
        directorCreate('Sergio', 'Leone', '1929-01-03', '1989-04-30')
    ]);
}

async function createMovies() {
    console.log('Adding movies');
    await Promise.all([
        movieCreate(
            'The Wolf of Wall Street',
            'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
            directors[0],
            [genres[0], genres[1]]
        ),
        movieCreate(
            'Dune: Part One',
            `A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.`,
            directors[1],
            [genres[2], genres[3], genres[4]]
        ),
        movieCreate(
            'Once Upon a Time in Hollywood',
            `A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.`,
            directors[2],
            [genres[0], genres[4]]
        ),
        movieCreate(
            'Inception',
            'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
            directors[3],
            [genres[2], genres[3], genres[5]]
        ),
        movieCreate(
            'Interstellar',
            'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
            directors[3],
            [genres[3], genres[4], genres[5]]
        ),
        movieCreate(
            'The Good, the Bad and the Ugly',
            'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
            directors[4],
            [genres[3], genres[6]]
        )
    ]);
}

async function createMovieStatuses() {
    console.log('Adding movie statuses');
    await Promise.all([
        movieStatusCreate(movies[0], false, 'Watched'),
        movieStatusCreate(movies[1], false, false),
        movieStatusCreate(movies[2], false, false),
        movieStatusCreate(movies[3], false, 'Watchlist'),
        movieStatusCreate(movies[4], false, 'Watched'),
        movieStatusCreate(movies[5], false, 'Watch again')
    ]);
}
