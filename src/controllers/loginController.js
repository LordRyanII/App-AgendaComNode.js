const { async } = require('regenerator-runtime');
const Login = require('../models/loginModels');

exports.index = (req, res) => {
    if(req.session.user){
        return res.render('login-logado')
    }
    return res.render('login')
};

//Função que irá ser responsavél por pegar o body e cadastrar no banco
exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'SUCESSO! Usuário cadastrado na base de dados, feliz usuário?:)');
        req.session.save(function () {
            return res.redirect('/login/index');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};


//Função que irá ser responsavél por pegar o body e cadastrar no banco
exports.login = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        };

        req.flash('success', 'Bem-vindo de volta, você adentrou ao sistema:)');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/login/index');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};


exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
};