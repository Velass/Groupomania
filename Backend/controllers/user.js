const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {validationResult,} = require('express-validator');

// Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log("erreur signup ")
        return res.status(400).json({ errors: errors.array() });
    }
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
exports.login = (req, res, next,) => {
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
                            // res.cookie("cookie" + "test", console.log("cookie"), {
                            //     expires: new Date(Date.now() + 24 * 3600000), hhtpOnly: true,
                            //     hhtpOnly: true ,
                            //     // cookie will be removed after 24 hours
                            //     next
                                
                            // });
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id, isAdmin: user.isAdmin },
                                    "RANDOM_TOKEN_SECRET",
                                    { expiresIn: "24h" }, 

                                ),
                            })

                            // console.log(req.cookies);
                            


                        }
                    })
                    .catch(error => res.status(500).json({ error }))

            }
        })
        .catch(error => res.status(500).json({ error }))

};










