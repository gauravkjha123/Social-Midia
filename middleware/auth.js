var jwt = require('jsonwebtoken');
const User = require('../models/user');

const sessionCheck=async function (req,res,next) {
    try {
        if (req.session.user && req.cookies?.codeial) {
            return res.redirect('/users/profile')
        }
        next()
    } catch (error) {
        res.redirect('/users/sign-in');
    }

}

const isAuthenticated=async function (req,res,next) {
    try {
        if (req.session.user && req.cookies?.codeial) {
            res.locals.user =req.session.user;
            next()
           
        }else{
            return res.redirect('/users/sign-in')
        }
    } catch (error) {
        res.redirect('/');
    }

}
module.exports ={sessionCheck,isAuthenticated};