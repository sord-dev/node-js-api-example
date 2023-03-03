const { genSalt, hash, compare } = require("bcrypt");
const express = require("express");
const authRouter = express.Router();

const users = require("../config/users.json");
const User = require("../models/User.js");

authRouter.post("/sign-up", async (req, res) => {
  const { body } = req;

  // find the user
  const userExists = users.find((user) => {
    return body.username === user.username;
  });

  // if they exist, reject
  if (userExists) {
    return res.status(400).json({ error: "user already exists" });
  }
  // if they don't exist, create new user
  else {
    let user = User(body);

    // hash user password
    let salt = await genSalt();
    let hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;

    // add user to "database"
    users.push(user);

    // respond with created user
    return res.status(201).json(user);
  }
});

authRouter.post("/sign-in", async (req, res) => {
  const { body } = req;

  // find the user
  const userExists = users.find((user) => {
    return body.username == user.username;
  });

  //if the user doesn't exist
  if (!userExists) {
    return res.status(404).json({ error: "user credentials not found" });
  }

  // if the user exists, check their password
  if (userExists) {
    const pass = await compare(body.password, userExists.password);
    if (pass)
      return res.status(200).json({
        user: { ...userExists, password: "" },
        cookie: "whakjsdfasd==?sdg.783246342",
      });
    // else log in
    else {
      return res.status(401).json({ error: "incorrect password" });
    }
  }
});

authRouter.get("/me", (req, res) => {
  const { body } = req;

  // if req not authroied via cookie, reject
  if (!req.body.cookie) {
    return res.status(401).json({ error: "not authorised" });
  }

  // find the user
  const userExists = users.find((user) => {
    return body.username === user.username;
  });

  // if there isn't a user, reject
  if (!userExists) {
    return res.status(404).json({ error: "user credentials not found" });
  }

  // if there is a user and the cookie is present, accept and send found user
  else if (userExists && req.body.cookie === "whakjsdfasd==?sdg.783246342") {
    return res.status(200).json({ ...userExists, password: "" });
  }
});

authRouter.post("/me", (req, res) => {
  const { body } = req;

  // if req not authroied via cookie, reject
  if (!req.body.cookie) {
    return res.status(401).json({ error: "not authorised" });
  }

  // find the user
  const userExists = users.find((user) => {
    return body.username === user.username;
  });

  // if there isn't a user, reject
  if (!userExists) {
    return res.status(404).json({ error: "user credentials not found" });
  }

  // if there is a user and the cookie is present, accept and update user
  else if (userExists && req.body.cookie === "whakjsdfasd==?sdg.783246342") {
    let idx = users.indexOf(userExists);

    let newUser = { ...userExists, ...body };
    users[idx] = newUser;

    return res.status(200).json({ ...newUser, password: "" });
  }
});


module.exports = authRouter;
