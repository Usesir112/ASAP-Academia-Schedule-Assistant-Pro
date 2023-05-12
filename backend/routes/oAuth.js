const express = require("express");
const passport = require("passport");
const url = require("url");

const router = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate(
    "google",
    {
      successRedirect: "/auth/protected",
      failureRedirect: "/auth/google/failure",
    },
  )
);

router.get("/auth/protected", isLoggedIn, (req, res) => {
  res.redirect(
    `http://localhost:8080/table/?email=${req.user.email}&name=${req.user.displayName}`
  );
});

router.get("/auth/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
  res.send("good Bye");
});

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

module.exports = router;
