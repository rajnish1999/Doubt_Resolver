const express = require('express');
const router = express.Router();

const User = require('../database/models/user');
const passport = require('../authentication/passportAuth');

router.get('/signUp', (req, res) => {
    res.render('signUp');
})

router.post('/signUp', async (req, res) => {
    const {username, email, password, confirmPass} = req.body;
    let flag=false;
    if(!username || ! email || !password || !confirmPass){
        req.flash('message', 'Please enter all the fields');
        flag=true;
    }

    else if(password.length < 6){
        req.flash('message', 'Password minimum length allowed is 6');
        flag=true;
    }

    else if(password != confirmPass){
        req.flash('message', 'Passwords do not match');
        flag=true;
    }

    if(flag){
        res.render('signUp',{
            message: req.flash('message'),
            username,
            email,
            password,
            confirmPass
        })
    }else{
        try {
            const user = await User.findOne({ email: email});
            if(user){
                console.log("done2")
                req.flash('message', 'Email iD already exist');
                res.render('signUp',{
                    message : req.flash('message'), 
                    username, email, password, confirmPass
                })
            }else{
                console.log("done3")
                const newUser = new User({
                    "username": username,
                    "email": email,
                    "password": password
                })
                await newUser.save();
                req.flash('message' , 'You are now registered and can log in');
                res.redirect('/login');
            }

        } catch(err){
            console.log(err)
            throw err;
            // res.render('signUp',{
            //     errors, username, email, password, confirmPass
            // })
        }
    }
})

router.get('/login',(req, res) => {
    res.render('login', {
        error: req.flash('error'),
        message: req.flash('message')
    });
})


router.post('/login', passport.authenticate('local',{
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true // this is to set flash message
    })
)

module.exports = router;