// Classes/comentario.js
import { FIREBASE_PATHS, insertFirebase, removeFirebase, getCurrentUser } from '../Utils/firebase.js';
import { Usuario } from './usuario.js';

export class Comentario {
  constructor() {
    this._ID_comentario = null;
    this._ID_post = null;
    this._ID_usuario = null;
    this._Texto = null;
    this._Data = null;
    this._Curtidas = {}; 
    this._qntCurtidas = 0;
  }

  get ID_comentario() { return this._ID_comentario; }
  get ID_post() { return this._ID_post; }
  get ID_usuario() { return this._ID_usuario; }
  get Texto() { return this._Texto; }
  get Data() { return this._Data; }
  get Curtidas() { return this._Curtidas; }
  get qntCurtidas() { return this._qntCurtidas; }

  set ID_comentario(value) { this._ID_comentario = value; }
  set ID_post(value) { this._ID_post = value; }
  set ID_usuario(value) { this._ID_usuario = value; }
  set Texto(value) { if(typeof value !== 'string' || !value.trim()) throw new Error("Texto inválido para comentário"); this._Texto = value.trim(); }
  set Data(value) { this._Data = value; }

  async save() {
      if (!this.ID_post || !this.ID_comentario) throw new Error("ID do post e do comentário são necessários para salvar.");
      const comentarioPath = FIREBASE_PATHS.getComentarioPath(this.ID_post, this.ID_comentario);
      await insertFirebase(comentarioPath, this.toJSON());
  }

  toJSON() {
    return {
      ID_usuario: this.ID_usuario,
      Texto: this.Texto,
      Data: this.Data || new Date().toISOString(),
      qntCurtidas: this.qntCurtidas,
    };
  }

  static fromJSON(json) { 
    const comentario = new Comentario();
    comentario.ID_comentario = json.ID_comentario; 
    comentario.ID_post = json.ID_post;
    comentario.ID_usuario = json.ID_usuario;
    comentario.Texto = json.Texto;
    comentario.Data = json.Data;
    if (json.Curtidas) comentario._Curtidas = json.Curtidas; else comentario._Curtidas = {}; 
    comentario._qntCurtidas = json.qntCurtidas !== undefined ? json.qntCurtidas : Object.keys(comentario._Curtidas).length;
    return comentario;
  }

  async curtir() {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("Usuário não autenticado para curtir comentário.");
    const userId = currentUser.uid;

    const curtidaUsuarioPath = FIREBASE_PATHS.getCurtidaUsuarioComentarioPath(this.ID_post, this.ID_comentario, userId);

    if (this._Curtidas[userId]) { 
        await removeFirebase(curtidaUsuarioPath);
        delete this._Curtidas[userId];
        this._qntCurtidas = Math.max(0, this._qntCurtidas - 1);
    } else { 
        await insertFirebase(curtidaUsuarioPath, true);
        this._Curtidas[userId] = true;
        this._qntCurtidas += 1;
    }
    
    const qntCurtidasPath = `${FIREBASE_PATHS.getComentarioPath(this.ID_post, this.ID_comentario)}/qntCurtidas`;
    await insertFirebase(qntCurtidasPath, this._qntCurtidas);
  }

  checkCurtidoPor(userId) {
    if (!userId) return false;
    return !!this._Curtidas[userId];
  }

  async extractUsuario() {
    if (!this.ID_usuario) return null;
    return Usuario.loadProfile(this.ID_usuario);
  }
}