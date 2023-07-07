const mongoose = require('mongoose');
const validator = require('validator')

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const loginModel = mongoose.model('login', loginSchema);

class login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async register() { //Registrar usuário no banco 
    this.valida();
    if (this.errors.length > 0) return;

    try {
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
    if (this.body.password.length < 3 || this.body.password.length >= 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    }
    //Senha entre 3 e 50 caracteres


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
