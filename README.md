# Spacestagram
Spacestagram uses NASA's Picture of the Day API to display photos from December 2021. 

## Features
* A user can sign up and log in to view the photos and click the Heart icon to "Like" the photo.
    * If you'd like to log-in as an already-existing user, seeded users are **Corinne**, **Cody**, and **Bob** with passwords **123**.
    * The heart will be red if the user likes it, and grey if the user does not like it or chooses to "unlike" it. 
* The top of the image card shows a heart with a badge indicating the total number of likes it received from all users.  
* A user can click the down facing arrow to read the description of the photo.
* A user can click the "Add Photo From a Random Date" button to add a random photo to the gallery.

## Tech Stack
* JavaScript
* React.js
* NASA's Picture of the Day API
* Material UI
* Node.js
* Express
* PostgreSQL
* Sequelize
* Redux

## Links

- [Github Repo](https://github.com/nightsandwich/shopify-spacestagram "Spacestagram Repo")

- [Live on Heroku](https://spacestagram-ct.herokuapp.com/ "Live View")

## Available Commands

In the project directory, you can run:

**`"npm run seed"`**
to seed the December photos, some test users, and test "Likes".

**`"npm run start:dev"`**
to build the app and run the server.

