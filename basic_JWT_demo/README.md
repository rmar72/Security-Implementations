# A few words on my behalf

This demo is the works of Nick Cerminara, I found it on [scotch.io](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)

I liked the idea of implementing JWT without passport, so that is the reason behind pushing this up as
a valid implementation in my book. FYI I did make a few modifications to the code but nothing drastic.

**Heads Up - basic demo with the sole purpose to generate JWTs and access different routes on the server. Technologies used are: 
jwt, mongoose and it does not cover password encryption nor does it include views to interact from a browser. I suggest using Postman, a Node client, [cUrl](https://curl.haxx.se/), or [httpie](https://httpie.org/)**

And with that I leave you to the original doc for this demo, thanks for the contribution Nick!

|

|

|

# Node Token Authentication

This repo uses JSON Web Tokens and the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package to implement token based authentication on a simple Node.js API.

This is a starting point to demonstrate the method of authentication by verifying a token using Express route middleware.

## Requirements

- node and npm

## Usage

1. Clone the repo: `git clone git@github.com:scotch-io/node-token-authentication`
2. Install dependencies: `npm install`
3. Change SECRET in `config.js`
4. Add your own MongoDB database to `config.js`
5. Start the server: `node server.js`
6. Create sample user by visiting: `http://localhost:8080/setup`

Once everything is set up, we can begin to use our app by creating and verifying tokens.

### Getting a Token

Send a `POST` request to `http://localhost:8080/api/authenticate` with test user parameters as `x-www-form-urlencoded`. 

```
  {
    name: 'Nick Cerminara',
    password: 'password'
  }
```

### Verifying a Token and Listing Users

Send a `GET` request to `http://localhost:8080/api/users` with a header parameter of `x-access-token` and the token.

You can also send the token as a URL parameter: `http://localhost:8080/api/users?token=YOUR_TOKEN_HERE`

Or you can send the token as a POST parameter of `token`.
