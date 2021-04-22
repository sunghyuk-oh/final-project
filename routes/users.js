var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET users listing. */
router.post('/login', function (req, res, next) {
  const { email, password } = req.body;
  var user_data = require('../database/user.json')
  if (!user_data[email]) {
    return res.status(400).send("user not found")
  }

  const current_password = user_data[email].password;

  if (password !== current_password) {
    return res.status(400).send("wrong password")
  }

  res.status(200).send(user_data[email]);
  // validation to throw error if email does not exist

  // throw new Error("user not found").message("user not found")
});


router.get('/data', function (req, res, next) {
  var user_data = require('../database/user.json')

  res.status(200).send(user_data);

});


router.post('/register', function (req, res, next) {
  const { first_name, last_name, email, password } = req.body;
  var user_data = require('../database/user.json')
  console.log("user data ", user_data[email], user_data);
  if (!!user_data[email]) {
    return res.status(400).send("user already exists, try login ")
  }

  if (!first_name
    || !last_name
    || !email
    || !password) {
    return res.status(400).send("required field is missing")
  }

  user_data[email] = {
    password, first_name, last_name
  }

  fs.writeFileSync('./database/user.json', JSON.stringify(user_data))

  res.send(user_data[email])
});

module.exports = router;
