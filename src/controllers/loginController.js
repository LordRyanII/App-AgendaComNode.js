const { async } = require('regenerator-runtime');
const Login = require('../models/loginModels');

exports.index = (req, res) => {
    return res.render('login')
};

exports.register = async (req, res) => {
    const login = new Login(req.body);
    await login.register();

    if(login.errors.length > 0){
        req.flash('errors', login.errors);
        req.session.save(() => {
            return req.redirect('back');
        });
        return;
    }


    res.send(login.errors);
}