const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  email: {type: String, required: true},
  senha: {type: String, required: true},
});

const loginModel = mongoose.model('login', loginSchema);

class login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  register(){
    this.valida();
  }
  valida() {
    this.cleanUp();
    //O email precisa ser valido
    
    //Senha entre 3 e 50 caracteres


  }
  cleanUp(){
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key]= '';
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = login;
