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
                //ye jo bhi message hum likh rahe hain yahan kissi issue aane pe, passport inn msg ko req.flash 
                //mai error key mai daal dega, req.flash('error') likh kar access kar sakte ho app inko and 
                // frontend mai bhej sakte ho jaise maine bheja hai login waale route pe
                return done(null, false,{message: 'Email not registered'})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
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