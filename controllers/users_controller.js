const User = require('../models/user');
const restarationSChema = require('../validationSchema/resistaration.schema.js');
const loginSChema = require('../validationSchema/login.schema');
const bcrypt = require('bcrypt');



module.exports.profile = function(req, res){
    try {
        return res.render('user_profile', {
            title: 'User Profile'
        })
    } catch (error) {
        return res.redirect("/")
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function (req, res){

    try {
        let {error}= restarationSChema.validate(req.body);
        if (error) {
           return resredirect('back');
        }
    
        let {email,password,name,confirm_password}=req.body;
    
        if (confirm_password!==password) {
            return res.redirect('back');
        }
        let existUser=await User.findOne({email:email});
        if (existUser) {
            return res.redirect('back')
        }
        let salt= await bcrypt.genSalt( 10);
        let hashPassword= await bcrypt.hash(password,salt);
        let  user=new User({
            email,
            password:hashPassword,
            name
        })
        await user.save()
        return res.redirect('/users/sign-in')
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}


// sign in and create a session for the user
module.exports.createSession =async  function(req, res){

    try {
        let {error}=loginSChema.validate(req.body);
        if (error) {
            return res.redirect('back');
        }
        let {email,password}=req.body;
        let user=await User.findOne({email:email});
        if (!user) {
            return res.redirect('back');
        }
        let comparePassword=await bcrypt.compare(password,user.password);
        if (!comparePassword) {
            return res.redirect('back');
        }
        req.session.user=user;
        return res.redirect('/users/profile');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.destroySession = function(req, res){
    req.session.destroy();
    return res.redirect('/');
}