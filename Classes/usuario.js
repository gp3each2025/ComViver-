// Classes/usuario.js
import { FIREBASE_PATHS, insertFirebase, removeFirebase, searchUsuario as searchUserProfile } from '../Utils/firebase.js';

export class Usuario {
  constructor() {
    this._ID_usuario = null; // Será o uid do Firebase Auth
    this._Nascimento = null;
    this._Nome = null;
    this._Email = null; // Email do perfil (pode ser o mesmo do auth)
    this._Casa_repouso = false;
    this._Endereco = null;
    this._Icone = null; // URL ou Base64 da imagem do ícone
  }

  get ID_usuario() { return this._ID_usuario; }
  get Nascimento() { return this._Nascimento; }
  get Nome() { return this._Nome; }
  get Email() { return this._Email; }
  get Casa_repouso() { return this._Casa_repouso; }
  get Endereco() { return this._Endereco; }
  get Icone() { return this._Icone; }

  set ID_usuario(value) {
    if (!value) throw new Error("ID do usuário não pode ser nulo ou vazio.");
    this._ID_usuario = value;
  }
  set Nascimento(value) {
    this._Nascimento = value;
  }
  set Nome(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error("Nome inválido.");
    }
    this._Nome = value.trim();
  }
  set Email(value) {
    if (typeof value !== 'string' || !value.includes('@')) { // Validação simples
        throw new Error("Email inválido.");
    }
    this._Email = value.trim();
  }
  set Casa_repouso(value) {
    this._Casa_repouso = typeof value === 'boolean' ? value : false;
  }
  set Endereco(value) {
    this._Endereco = value;
  }
  set Icone(value) {
    this._Icone = value;
  }

  async saveProfileData() {
    if (!this.ID_usuario) {
      console.error("❌ ID_usuario não definido. Não é possível salvar o perfil.");
      throw new Error("ID do usuário é obrigatório para salvar o perfil.");
    }
    const profileData = this.toJSON();
    await insertFirebase(FIREBASE_PATHS.getUsuarioPath(this.ID_usuario), profileData);
  }

  async removeProfileData() {
    if (!this.ID_usuario) {
      console.error("❌ ID_usuario não definido. Não é possível remover o perfil.");
      throw new Error("ID do usuário é obrigatório para remover o perfil.");
    }
    // Para remover a conta de autenticação: user.delete()
    await removeFirebase(FIREBASE_PATHS.getUsuarioPath(this.ID_usuario));
  }

  toJSON() {
    return {
      ID_usuario: this.ID_usuario,
      Nascimento: this.Nascimento,
      Nome: this.Nome,
      Email: this.Email,
      Casa_repouso: this.Casa_repouso,
      Endereco: this.Endereco,
      Icone: this.Icone,
    };
  }

  static fromJSON(json) {
    const user = new Usuario();
    user.ID_usuario = json.ID_usuario;
    user.Nascimento = json.Nascimento;
    user.Nome = json.Nome;
    user.Email = json.Email;
    user.Casa_repouso = json.Casa_repouso === undefined ? false : json.Casa_repouso;
    user.Endereco = json.Endereco;
    user.Icone = json.Icone;
    return user;
  }

  static async loadProfile(userId) {
    if (!userId) throw new Error("UserID é necessário para carregar o perfil.");
    const userData = await searchUserProfile(userId);
    if (userData) {
      return Usuario.fromJSON({ ...userData, ID_usuario: userId });
    }
    return null;
  }
}
