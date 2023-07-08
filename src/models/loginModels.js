const mongoose = require('mongoose'); //Dependência para fazer a conexão com o mongoDb;
const validator = require('validator'); //Dependência para validar dados (emails...);
const bcryptjs = require('bcrypt'); //Dependência para criptografar dados sensíveis

const loginSchema = new mongoose.Schema({  //Define o esquema do banco de dados, o faço "body"
  email: { type: String, required: true }, //Define email como "required" ou seja obrigatório;
  password: { type: String, required: true }, //Define senha como "required" ou seja obrigatório;
});

const loginModel = mongoose.model('login', loginSchema); //Esse é um constructor do próprio mongoose, o nome do esquema mais o modelo que é está acima

class login { //Classe para construção dos dados para a base de dados
  constructor(body) { //Recebe o corpo, do formulário do nosso controle
    this.body = body; //Registra o body como objeto
    this.errors = []; //Cria uma array de mensagens
    this.user = null; //Define o nosso usuário como vazio
  }
  async register() { //Registrar usuário no banco 
    this.valida(); //Evoca por callback a função de validação
    if (this.errors.length > 0) return;

    try {
      const salt = bcryptjs.genSaltSync(); //Não precisa decorar, é um padrão para criar hashs de senha
      this.body.password = bcryptjs.hashSync(this.body.password, salt);
      this.user = await loginModel.create(this.body)
    } catch (error) {
      console.log(error)
    };
    this.user = await loginModel.create(this.body)
  }
  valida() { //Validar campos
    this.cleanUp();
    //O email precisa ser valido
    if (!validator.isEmail(this.body.email)) {
      this.errors.push('Email inválido');
    }
    //Senha entre 3 e 50 caracteres
    if (this.body.password.length < 3 || this.body.password.length >= 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    }
    

  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = login;
