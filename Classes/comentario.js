import { insertFirebase, removeFirebase, searchComentario } from '../Utils/firebase.js';
import * as Classes from './index.js'

export class Comentario {
  constructor() {
    this._ID_comentario = null;
    this._ID_post = null;
    this._ID_usuario = null; 
    this._Texto = null;
    this._Data = null; 
  }
    
  get ID_comentario() { return this._ID_comentario; }
  get ID_post() { return this._ID_post; }
  get ID_usuario() { return this._ID_usuario; }
  get Texto() { return this._Texto; }
  get Data() { return this._Data; }

  set ID_comentario(value) { this._ID_comentario = value; }
  set ID_post(value) { this._ID_post = value; }
  set ID_usuario(value) { this._ID_usuario = value; }
  set Texto(value) { this._Texto = value; }
  set Data(value) { this._Data = value; }

  insertData() { insertFirebase(`Comentários/${this.ID_comentario}`, this.toJSON()); }

  removeData() { removeFirebase(`Comentários/${this.ID_comentario}`); }
    
  toJSON() {
    return {
      ID_comentario: this.ID_comentario,
      ID_post: this.ID_post,
      ID_usuario: this.ID_usuario,
      Texto: this.Texto,
      Data: this.Data,
    };
  }
 
  static fromJSON(json) {
    const comentario = new Comentario();
    comentario.ID_comentario = json.ID_comentario;
    comentario.ID_post = json.ID_post;
    comentario.ID_usuario = json.ID_usuario;
    comentario.Texto = json.Texto;
    comentario.Data = json.Data;
    return comentario;
  }
  
  async extractPost() {
    const post = await Classes.Post.fromID(this.ID_post)
    return post;
  }

  async extractUsuario() {
    const user = await Classes.Usuario.fromID(this.ID_usuario)
    return user;
  }
  
  static async fromID(ID) {
    const comentario = Comentario.fromJSON(await searchComentario(ID));
    return comentario;
  } 
}
