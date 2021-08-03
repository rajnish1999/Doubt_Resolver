const isAuth = (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        }else{
            req.flash('error', 'You are not authorized to view the resource');
            req.session.returnTo = req.originalUrl; 
            res.redirect('/login')
        }
}

module.exports = isAuth;