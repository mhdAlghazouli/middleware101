const http = require("http");
const express = require('express');
const morgan = require("morgan");
const someMiddleware = require("./someMiddleware");
const bcrypt = require("bcrypt");
const saltRounds = 10;


console.log("someMiddleware", someMiddleware)

const app = express();
const server = http.createServer(app);
const logger = morgan("tiny");

const HOST = "127.0.0.1";
const POST = 3000;

app.use(express.static("public"));

// app.all("*", (req, res, next) => {
//   console.log(`app.all: ${req.method} ${req.path}`);
//   next();
// });

app.use(logger);

app.use((req, res, next) => {
  console.log(`app.use: ${req.method} ${req.path}`);
  next();
});

app.get('/',someMiddleware, (req,res,next) => {
  res.send("Hello middleware");
});

app.get('/register', (req, res, next) => {
  const myPlainTextPassword = "fluffyKitten123";
  bcrypt.hash(myPlainTextPassword, saltRounds, function(err, hash) {
    if(err) {
      console.log("error: " + err);
    }else{
      console.log("the hashed password becomes: ", hash);
      res.send(hash);
    }
  });
});

app.get("/login", (req, res, next) => {
  const myPlainTextPassword = "fluffyKitten321";
  const myHashedPw = "$2b$10$ueL2PfLaKAa1IOTZGV1DLe.yHPYyBWSFVLYGVJJzNWVZBafIaXl.6";

  bcrypt.compare(myPlainTextPassword, myHashedPw, (err, result) => {
    if(err) {
      res.send(err);
    }else{
      res.send(result);
    }
  })
});

const middleware2 = (req, res, next) => {
  console.log("I'm middleware2");
  next();
}

app.get("/saturday",[logRequest, middleware2], (req, res, next) => {
  //want to register user
  // use my user model to check if username is available
  //if username is available, create nre User Object, save to db

  res.send('hello');
});

app.get("/node_modules", (req, res, next) => {
  res.send ("this is not actually the node_modules folder");
});

server.listen(POST, HOST, () => {
  console.log(`Listening on http://${HOST}:${POST}`);
});

function logRequest(req, res, next) {
  console.log(`f logRequest, Request received: ${req.method} ${req.path}`)
  next();
}