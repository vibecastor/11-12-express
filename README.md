##Express Middleware 1.0.0
- Author: Mike Castor

##Overview
- This lab assignment from Code Fellows 401 - Javascript.  The assignment was to add error logging middleware to our already built http request routes. 

##Getting Started
- In order to get started with this code please fork and clone the repo.  You will need a number of dependencies in order to run this project.  See below...

# Server.js
- ensure you have the following dependencies installed...
  "devDependencies": {
    "babel-eslint": "^8.2.3",
    "babel-preset-env": "^1.6.1",
    "babel-register": "^6.26.0",
    "eslint": "^4.19.1",
    "eslint-config-airbnb-base": "^12.1.0",
    "eslint-plugin-import": "^2.11.0",
    "eslint-plugin-jest": "^21.15.0",
    "jest": "^22.4.3",
    "superagent": "^3.8.3"
  },
  "dependencies": {
    "body-parser": "^1.18.2",
    "dotenv": "^5.0.1",
    "express": "^4.16.3",
    "faker": "^4.1.0",
    "http-errors": "^1.6.3",
    "mongoose": "^5.0.16",
    "winston": "^3.0.0-rc4"
  }

- Before starting the server you must launch MongoDB by entering npm run dbon (this script can be found in the package.json)
- Now run the server by launching nodemon or node.js

##Architecture
- This project is built using Javascript ES6 with transpilation using Babel.  The main entry point of the code is the index.js.  The project also includes several developer dependencies listed in the package.json.

##Change Log
- 05-01-2018 6:30pm - Began work on project
- 05-01-2018 8:30pm - building delete route
- 05-02-2018 8:00am - integrating error middleware


##Credits and Collaborations
- Thanks Vinicio Sanchez for demo code! 


