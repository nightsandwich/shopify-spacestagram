# Spacestagram
Spacestagram uses NASA's Picture of the Day API to display photos from December 2021. 

## Features
* A user can sign up and log in to view the photos and click the Heart icon to "Like" the photo.
    * If you'd like to log in without signing up, you may sign in as **Corinne**, **Cody**, or **Bob** with password **123**.
    * The heart will be red if the user likes it, and grey if the user does not like it or chooses to "unlike" it. 
* The top of the image card shows a heart with a badge indicating the total number of likes it received from all users.  
* A user can click the down facing arrow to read the description of the photo.
* A user can click the "ADD RANDOM PHOTO" button to add a photo from a random date (before December 2021) to the gallery.
* A user can click the "MY LIKES" button to just view photos they've liked, or "ALL PHOTOS" to go back to viewing all images.

## Links

- [Run on Heroku](https://spacestagram-ct.herokuapp.com/ "Live View")

- [Github Repo](https://github.com/nightsandwich/shopify-spacestagram "Spacestagram Repo")

## To Run Locally

Install: **`"npm i"`**

Seed December 2021 photos, three users, and 12 Likes: **`"npm run seed"`**

Build the app and start the server: **`"npm run start-server"`**

Run locally: [http://localhost:8080/](http://localhost:8080/)

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




