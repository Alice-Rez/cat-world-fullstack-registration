# Registration for React app

**"Join our cat-loving community and explore new cat illustration on each page!"**

## Description

Basic MERN fullstack application to create user profiles where some of the functions/pages are available exclusively just for login users. To make it more interesting, everything is wrapped in cat theme using illustrations from [icons8](https://icons8.com). Made as an exercise during final stage of my one year web development course. Frontend created in React, backend in Express with MongoDB as a database and Mongoose for object modelling.

Demo of the registration in the react app:

- Possibilities of register (e-mail has to be unique) and login

- logged user can change password

- logged user can also set/change profile photo (usage of multer package) - not working in deployed version at heroku

- basic verification by registration using express-validator

- it is displayed under each registration field, if it did not pass validation

No final product - no special styling (just basic bootstrap), no cleanly ordered code, etc. just playground.

Full stack with Express.js backend and MongoDB database.

Passwords are not correctly handled yet, so this exercise do not show correct way how to handle passwords!

File structure for deploying in heroku.

## Setup

1. clone this repository
2. instal all dependencies using ` npm install` in root and `client`
3. start server in root by `nodemon start`
4. start frontend part in `client` by `npm start`
5. enjoy exploring of the application

## Acknowledgement

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
