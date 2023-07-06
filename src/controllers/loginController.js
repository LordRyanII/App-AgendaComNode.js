const Login = require('../models/loginModels');

exports.index = (req, res) => {
    return res.render('login')
};

exports.register = (req, res) => {
    const login = new Login(req.body);
    login.register()
    res.send(login.body);
}