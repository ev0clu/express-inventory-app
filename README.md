# **Inventory App**

A simple CRUD app has built with Node.js and Express.js framework. Express generator has been used to create the skeleton of the project and EJS view engine has been used as templating engine. The app uses [MVC pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC) and mongoose ORM (Object Relational Model).

The app purpose to store movies which has already seen, will be seen or want to watch again by the user. The user can add new movies, directors and genres to the database and he/she can also modify or remove any of them from the database.

### Demo: [Link](https://express-inventory-app-z2ci.onrender.com)

## Features

-   EJS view engine is used to render the DOM
-   MongoDB uses to store data
-   Create, read, update and delete inventory items
-   Express validator and Form validator use to validate form values

## How to run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal
3. Create .env file and add a new enviromental variable named MONGODB_URL and paste your own mongoDB connection link
4. Run `npm run start` command in your terminal
5. Server running at `http://localhost:3000/`

### How to populate mongoDB database

-   Run 'node populatedb.js <MONGODB_URL>' in your terminal from the project root folder

## Dependencies

-   [Node.js](https://nodejs.org/en)
-   [Express.js](https://expressjs.com/)
-   [express-async-handler](https://www.npmjs.com/package/express-async-handler/)
-   [express-validator](https://www.npmjs.com/package/express-validator)
-   [EJS view engine](https://ejs.co/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [morgan](https://www.npmjs.com/package/morgan)
-   [http-errors](https://www.npmjs.com/package/http-errors)
-   [date-nfs](https://date-fns.org/)

### Layout

# ![layout picture](https://github.com/ev0clu/express-inventory-app/blob/main/layout.png?raw=true)
