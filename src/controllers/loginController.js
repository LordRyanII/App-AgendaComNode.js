const { async } = require('regenerator-runtime');
const Login = require('../models/loginModels');

exports.index = (req, res) => {
    return res.render('login')
};

//Função que irá ser responsavél por pegar o body e cadastrar no banco
exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }
        req.flash('sucess', 'Usuário criado com SUCESSO.');
        req.session.save(function () {
            return res.redirect('back');
        });
    }
   catch(error) {
    console.log("Erro ao registrar usuário: ", error);
    return res.render('404');
   }
}