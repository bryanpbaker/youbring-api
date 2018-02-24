# Youbring API

A RESTful api to store and manage users, events and contacts. Uses Node, Express, MongoDB and Mongoose.

## Getting Started

You can either clone the repo down and run locally, or access the dev api on heroku.

The local URL is `http://localhost:5000`

The dev/heroku URL is `https://youbring-api.herokuapp.com`

### End Points

##### Facebook Authentication - POST
`/auth/facebook?access_token=` - Pass an access code from Facebook to the access_token param


##### Email Login - POST
`/auth` - The body should be a JSON object with two properties, `email` and `password`


##### Fetch User - GET
`/user` - User id is decoded from Auth Token in `Authorization` header.


##### Create New User - POST
`/user/new` - The body should be a JSON object with 4 properties (for now), `firstName` `lastName` `email` and `password`


##### Fetch Contacts - GET
`/contacts` - The headers should contain an `Authorization` header with a JWT, the user's contacts will be searched by this


##### Create Contact - POST
`/contacts/create` - Pass in a user id, the body should contain a JSON object with a key of `newContact` and a value of another object, with 2 properties (for now), `name` and `phone` . The headers should contain an `Authorization` header with a JWT.


##### Fetch Events - GET
`/events` - The headers should contain an `Authorization` header with a JWT, the user's events will be searched by this


##### Create Event - POST
`/events/create` - Pass in a user id, the body should contain a JSON object with a key of `newEvent` and a value of another object, with 2 properties (for now), `name` and `date` . The headers should contain an `Authorization` header with a JWT.

#### Postman Docs
[Docs](https://documenter.getpostman.com/view/797918/youbring/RVg2AUM8)


### Prerequisites

To run this project, you need to have the latest version of Node.js installed on your machine.

[Node.js](https://nodejs.org/en/download/)

I'd also recommend using [n](https://github.com/tj/n) to manage your node version locally.

### Installing

To run the api locally, run `git clone git@github.com:bryanpbaker/youbring-api.git` in the directory you keep your code in.

Then `cd youbring-api` and then run `npm install`.

Now you should be good to go, just run `npm run dev`.

## Deployment

To deploy to heroku, simply commit all of your changes and run `git push heroku master`

## Built With

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](http://mongoosejs.com/)


## Authors

* **Bryan Baker** - [Github](https://github.com/bryanpbaker/youbring-api)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
