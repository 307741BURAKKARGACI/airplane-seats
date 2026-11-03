'use strict';

// imports
const express = require('express');
const morgan = require('morgan');
const {check, validationResult} = require('express-validator');
const cors = require('cors');
const dao = require('./seats-dao');
const userDao = require('./user-dao');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

// init
const app = express();
const port = 3001;

// set up middlewares
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  origin: ['http://localhost:5173','http://localhost:5174'],
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions));

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDao.getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { // this user is id + email + name
  return cb(null, user);
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

// GET /api/seats/local
app.get('/api/seats/:type', async (req, res) => {
    try {
      const type = req.params.type;
      const seatsOnLocal = await dao.getSeatsLocal(type);
      const results = seatsOnLocal.map(item => item[type]);
      const newArray=[];
      results.forEach(item => {
        if (item) {
          const values = item.split(',');
          newArray.push(...values);
        }
      });
      res.json(newArray);
    } catch {
      res.status(500).end();
    }
  });

app.post('/api/seats/addNew',  async (req, res) => {

  const newReservation = req.body;
  try {
    await dao.addNewReservation(newReservation);
    res.status(201).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    res.status(503).json({error: 'Impossible to create the page.'});
  }
});

app.delete('/api/reservations/delete/:type', async(req, res) => {
  // ...
    //const reservation = req.body;
    const type = req.params.type;
    try {
      await dao.deleteReservation(type);
      res.status(200).end();
    } catch {
      res.status(503).json({'error': `Impossible to delete this page #${answerId}.`});
    }
});

// POST /api/sessions
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).send(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});

  // GET /api/sessions/current
  app.get('/api/sessions/current', (req, res) => {
    if(req.isAuthenticated()) {
      res.json(req.user);}
    else
      res.status(401).json({error: 'Not authenticated'});
  });

  // DELETE /api/session/current
  app.delete('/api/sessions/current', (req, res) => {
    req.logout(() => {
      res.end();
    });
  });

  app.listen(port, () => 'API server started');
