const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { body, validationResult } = require('express-validator');
const express = require('express');
const app = express();

// Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "utilisateur crée" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};

// Connexion en utilisant bcrypt et jwt
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: "identifiant ou mot de passe incorrecte" })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: "identifiant ou mot de passe inccorecte" })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    "RANDOM_TOKEN_SECRET",
                                    { expiresIn: "24h" }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))

};


app.use(express.json());
app.post('/signup', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then(user => res.json(user));
});
app.post(
    '/signup',
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      User.create({
        username: req.body.username,
        password: req.body.password,
      }).then(user => res.json(user));
    },
  );