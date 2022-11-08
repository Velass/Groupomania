const express = require("express");
const router = express.Router();
const userControllers = require ("../controllers/user")
const { body, validationResult } = require('express-validator');
const app = express()
const auth = require("../middleware/auth")

//Routes de signup et de login
router.post("/signup", [ body('email').isEmail(),body('password').isLength({ min: 3 }),]
, userControllers.signup);
router.post("/login", userControllers.login,);

module.exports = router;