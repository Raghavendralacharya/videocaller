var express = require('express');
var router = express.Router();
// const { check, validationResult } = require('express-validator')

var nodemailer  = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Raghav' });
});

router.get('/about',function(req, res , next){
  res.render('about', {title: 'NoduApp - a platform for sharing code.'});
});

router.route('/contact')
.get(function(req, res, next){
  res.render('contact',{title: 'Contact Us'});
})
.post(function(req, res, next){
  req.checkBody('name','Empty name').notEmpty();
  req.checkBody('email','Invalid email').isEmail();
  req.checkBody('message','Empty message').notEmpty();
  var errors = req.validationErrors();
  
  if(errors){
    res.render('contact', {
      title:'NoduApp - a platform for sharing code.',
      name :req.body.name,
      email: req.body.email,
      message: req.body.message,
      errorMessages: errors
    })
  } else {
    var mailOptions ={
      from : 'NoduApp <no-reply-NoduApp@gmail.com>',
      to : 'raghavendralacharya@gmail.com',
      subject : 'You got new msg from visitor 👍',
      text : req.body.message
    }

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      res.render('thank',{title: 'NoduApp - a platform for sharing code.'});
    })    
  }
});

router.get('/login', function(req, res, next){
  res.render('login', { title : 'Login your Account'})
});

router.get('/register', function(req, res, next){
  res.render('register', { title : 'Register your Account'})
});

module.exports = router;
