var express = require('express');
var router = express.Router();

// note: .js isn't necessary
//Define the controllers for checkin process
var landing = require('./landing');
var theming = require('./theming');
var login = require('./login');
var formbuilder = require('./formbuilder');
var accountSettings = require('./accountsettings');
var uploadLogo = require('./uploadlogo');
var register = require('./register');
var dashboard = require('./dashboard');
var addEmployees = require('./addemployees');
var employeeRegister = require('./employeeregister');
var viewForm = require('./viewform');
var customizeTheme = require('./customize_theme');
var manageForms = require('./manage_forms');
var businesssetting = require('./businesssetting');
module.exports = function (passport) {



    //Pass in passport

    //Setup the routes
    router.get('/', landing.get);
    router.post('/', landing.post);

    router.get('/theming', isLoggedIn, theming.get);

   // router.get('/login', landing.get);
    router.post('/login',passport.authenticate('local-login',{
        successRedirect : '/dashboard',
        failureRedirect : '/',
        failureFlash: true
    }));

    router.get('/formbuilder',isLoggedIn, formbuilder.get);


    router.get('/accountSettings', isLoggedIn, accountSettings.get);
    router.post('/accountSettings', isLoggedIn, accountSettings.post);

    router.get('/businesssetting', isLoggedIn, businesssetting.get);
    router.post('/businesssetting', isLoggedIn,businesssetting.post);


    router.get('/uploadlogo', isLoggedIn, uploadLogo.get);
    router.post('/uploadlogo', isLoggedIn, uploadLogo.post);

    router.get('/register', register.get);
    router.post('/register',passport.authenticate('local-signup',{
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/register' // redirect back to the signup page if there is an error
    }));

    router.get('/dashboard', isLoggedIn, dashboard.get);

    router.get('/addemployees',isLoggedIn, addEmployees.get);
    router.post('/addemployees',isLoggedIn, addEmployees.post);

    router.get('/customizetheme', isLoggedIn, customizeTheme.get);

    router.get('/manageforms', isLoggedIn, manageForms.get);

    router.get('/employeeregister', employeeRegister.get);
    router.post('/employeeregister', passport.authenticate('local-signup-employee',{
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/register' // redirect back to the signup page if there is an error
    }));

    router.get('/viewform/:id', viewForm.get);

    router.get('/logout', logOutUser);

    function logOutUser(req, res) {
        req.logOut();
        res.redirect('/');
    }

    function isLoggedIn(req,res,next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/');
    }

// route middleware to make sure a user is logged in
//function isLoggedInBusiness(req, res, next) {
//    // if user is authenticated in the session, carry on
//    if (req.isAuthenticated()&& (req.user[0].admin === true)){
//        return next();
//    }
//    //req.flash("permission", "You do not have permission to access that page");
//    // if they aren't redirect them to the home page
//    res.redirect('back');
//}


    return router;
};
