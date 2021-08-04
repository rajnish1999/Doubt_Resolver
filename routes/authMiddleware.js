const isAuth = (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        }else{
            req.flash('error', 'Login required!!');
            req.session.returnTo = req.originalUrl; 
            res.redirect('/login')
        }
}

module.exports = isAuth;