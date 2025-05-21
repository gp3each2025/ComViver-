import { insertFirebase, removeFirebase, searchPost } from '../Utils/firebase.js';

export class Post {
  constructor() {
    this._ID_post = null;
    this._Titulo = null;
    this._Texto = null;
    this._Icone = null;
    this._Foto = null;
    this._Data = null;
  }

  get ID_post() { return this._ID_post; }
  get Titulo() { return this._Titulo; }
  get Texto() { return this._Texto; }
  get Icone() { return this._Icone; }
  get Foto() { return this._Foto; }
  get Data() { return this._Data; }

  set ID_post(value) { this._ID_post = value; }
  set Titulo(value) { this._Titulo = value; }
  set Texto(value) { this._Texto = value; }
  set Icone(value) { this._Icone = value; }
  set Foto(value) { this._Foto = value; }
  set Data(value) { this._Data = value; }

  insertData() { insertFirebase(`Posts/${this.ID_post}`, this.toJSON()); }

  removeData() { removeFirebase(`Posts/${this.ID_post}`); }
    
  toJSON() {
    return {
      ID_post: this.ID_post,
      Titulo: this.Titulo,
      Texto: this.Texto,
      Icone: this.Icone,
      Foto: this.Foto,
      Data: this.Data,
    };
  }

  static fromJSON(json) {
    const post = new Post();
    post.ID_post = json.ID_post;
    post.Titulo = json.Titulo;
    post.Texto = json.Texto;
    post.Icone = json.Icone;
    post.Foto = json.Foto;
    post.Data = json.Data;
    return post;
  }
    
  static async fromID(ID) {
    const post = Post.fromJSON(await searchPost(ID));
    return post;
  }
}