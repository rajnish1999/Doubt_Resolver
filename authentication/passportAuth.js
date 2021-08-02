const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

const User = require('../database/models/user');

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        console.log("inside passport")
        try{
            const user = await User.findOne({email: email});
            if(!user){
                console.log("done1")
                return done(null, false,{message: 'Email not registered'})
            }
            const isMatch = bcrypt.compare(password, user.password);
            if(isMatch){
                return done(null,false,{message: 'Wrong Password'})
            }
            console.log("done3")
            done(null,user)

        }catch(err){
            done(err);
        }
      
    })
)

passport.serializeUser((user,done)=>{
    console.log(user);
    done(null,user._id)
})


passport.deserializeUser((_id, done) => {
    User.findById(_id).then((user) => {
        done(null, user);
    }).catch((err) => {
        console.log(err);
    })
      
  });
  
module.exports=passport