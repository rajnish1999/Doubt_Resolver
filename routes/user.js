const express = require('express');
const router = express.Router();

const User = require('../database/models/user');
const passport = require('../authentication/passportAuth');

router.get('/signUp', (req, res) => {
    res.render('signUp');
})


router.post('/signUp', async (req, res) => {
    const {username, email, password, confirmPass} = req.body;
    let errors = [];
    if(!username || ! email || !password || !confirmPass){
        errors.push({msg : "Please enter all the fields"})
    }

    if(password.length < 6){
        errors.push({msg : "password should be atleast 6 in length"})
    }

    if(password != confirmPass){
        errors.push({msg : 'Passwords do not match'})
    }

    if(errors.length > 0){
        // res.render('signUp',{
        //     errors,
        //     username,
        //     email,
        //     password,
        //     confirmPass
        // })
        console.log("done1")
        res.json({
            errors,
            username,
            email,
            password,
            confirmPass
        })
    }else{
        try {
            const user = await User.findOne({ email: email});
            if(user){
                errors.push({msg : "email iD already exist"});
                // res.render('signUp',{
                //     errors, username, email, password, confirmPass
                // })
                console.log("done2")
                res.json({
                    errors,
                    username,
                    email,
                    password,
                    confirmPass
                })
            }else{
                const newUser = new User({
                    "username": username,
                    "email": email,
                    "password": password
                })
                await newUser.save();
                // res.redirect('/login')
                console.log("done signup");
                res.json({
                    errors,
                    username,
                    email,
                    password,
                    confirmPass
                })
            }

        } catch(err){
            console.log(err)
            errors.push(err);
            // res.render('signUp',{
            //     errors, username, email, password, confirmPass
            // })
            res.json({
                errors,
                username,
                email,
                password,
                confirmPass
            })
        }
    }
})

// router.get('/login',(req, res) => {
//     res.render('login');
// })
const middle = (req, res, next) => {
    console.log("inside middle");
    next();
}
router.post('/login', middle, passport.authenticate('local',{
        successReturnToOrRedirect: '/',
        failureRedirect: '/',
        failureFlash: false // this is to set flash message
    })
)

module.exports = router;