import { insertFirebase, removeFirebase, searchUsuario, searchUsuarioByEmail } from '../Utils/firebase.js';

export class Usuario {
  constructor() {
    this._ID_usuario = null;
    this._Nascimento = null;
    this._Nome = null;
    this._Email = null;
    this._Senha = null;
    this._Casa_repouso = false;
    this._Endereco = null;
    this._Icone = null;
    this._Senha = null;
  }

  get ID_usuario() { return this._ID_usuario; }
  get Nascimento() { return this._Nascimento; }
  get Nome() { return this._Nome; }
  get Email() { return this._Email; }
  get Senha() { return this._Senha; }
  get Casa_repouso() { return this._Casa_repouso; }
  get Endereco() { return this._Endereco; }
  get Icone() { return this._Icone; }
  get Senha() { return this._Senha; }

  
  set ID_usuario(value) { this._ID_usuario = value; }
  set Nascimento(value) { this._Nascimento = value; }
  set Nome(value) { this._Nome = value; }
  set Email(value) { this._Email = value; }
  set Senha(value) { this._Senha = value; }
  set Casa_repouso(value) { this._Casa_repouso = value; }
  set Endereco(value) { this._Endereco = value; }
  set Icone(value) { this._Icone = value; }
  set Senha(value) { this._Senha = value; }

  
  insertData() { insertFirebase(`Usuários/${this._ID_usuario}`, this.toJSON()); }

  removeData() { removeFirebase(`Usuários/${this._ID_usuario}`); }    

  toJSON() {
    return {
      ID_usuario: this.ID_usuario,
      Nascimento: this.Nascimento,
      Nome: this.Nome,
      Email: this.Email,
      Senha: this.Senha,
      Casa_repouso: this.Casa_repouso,
      Endereco: this.Endereco,
      Icone: this.Icone,
      Senha: this.Senha
    };
  }

  static fromJSON(json) {
    const user = new Usuario();
    user.ID_usuario = json.ID_usuario;
    user.Nascimento = json.Nascimento;
    user.Nome = json.Nome;
    user.Email = json.Email;
    user.Senha = json.Senha;
    user.Casa_repouso = json.Casa_repouso;
    user.Endereco = json.Endereco;
    user.Icone = json.Icone;
    user.Senha = json.Senha;
    return user;
  }
    
  static async fromID(ID) {
    const user = Usuario.fromJSON(await searchUsuario(ID));
    return user;
  }

  static async login(email, senha) {
    const usuario = await searchUsuarioByEmail(email);
    if (!usuario) return null;

    if (usuario.Senha === senha) {
      const user = Usuario.fromJSON(usuario);
      return user;
    }
    return null;
  }
}
