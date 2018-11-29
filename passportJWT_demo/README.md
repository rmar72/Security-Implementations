This demo makes use of passportJwt and some light vanilla JS

Run the app and see how JWTs are generated and used from the client to get back a secret from the server

**Heads Up - this is a demo with the sole purpose to generate JWTs and send them back to the server to retrieve a secret. This does not
cover setting up a DB, nor how to store the JWT in the client. Actually, for demo purposes I render the token to a paragraph element, this is by no means standard practice on how to handle a token on a client.**

Within Index.js you'll find the setup code for passport-jwt, express, routes, as well as a mock db (premade users). 

jwt_vanilla.js is a file that has 3 different ways of making ajax calls, 1. XMLHttpRequest, 2. es6 fetch, 3. async/await+fetch. Feel free to uncomment/swap out functionality to see the code accomplish the same goal but in 3 different ways.


|

|

|


If you'd like to download this particular folder plug this url https://github.com/rmar72/Security-Implementations/tree/master/passportJWT_demo 
into one of the following tools:

 - https://minhaskamal.github.io/DownGit/#/home
 
 - http://kinolien.github.io/gitzip/


Also, the following link contains Postman documentation I wrote for each route, if you'd like access shoot me a msg at rsolm72@gmail.com
https://riversun.postman.co/collections/3434701-658e87e6-bf40-4f2d-8eb5-251abb4d5bda?workspace=da6a5c73-4f7e-491b-8dea-0ec41c85d6a0
