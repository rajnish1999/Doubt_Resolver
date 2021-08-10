const checkForLogin = (req, res, next) => {
    if(req.isAuthenticated()) {
        req.logout();
        console.log("inside checkForLogin if");
        next();
    }
    console.log("inside checkForLogin outside if");
    next();
}

module.exports = checkForLogin;