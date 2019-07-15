require("dotenv").config();
const express = require("express");
const http = require("http");
const next = require("next");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const uid = require("uid-safe");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);

const authRoutes = require("./api/auth-routes");
const articlesAPI = require("./api/articles");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // 2 -
  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000 // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true
  };
  server.use(session(sessionConfig));
  server.use(bodyParser.json());

  // 3 - configuring Auth0Strategy
  const auth0Strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
  );

  // 4 - configuring Passport
  passport.use(auth0Strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  // 5 - adding Passport and authentication routes
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(authRoutes);

  articlesAPI(server, mongoose);

  // 6 - you are restricting access to some routes
  const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
  };

  server.use("/profile", restrictAccess);
  server.use("/write", restrictAccess);
  server.use("/edit", restrictAccess);
  server.use("/api/*", restrictAccess);

  // handling everything else with Next.js
  server.get("*", handle);

  const port = process.env.PORT || 8081;

  http.createServer(server).listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
