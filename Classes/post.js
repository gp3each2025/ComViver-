import { insertFirebase, removeFirebase, searchPost } from '../Utils/firebase.js';
import * as Classes from './index.js'
import * as Utils from '../Utils/index.js';

export class Post {
  constructor() {
    this._ID_post = null;
    this._ID_usuario = null;
    this._Titulo = null;
    this._Texto = null;
    this._Icone = null;
    this._Foto = null;
    this._Data = null;
  }

  get ID_post() { return this._ID_post; }
  get ID_usuario() { return this._ID_usuario; }
  get Titulo() { return this._Titulo; }
  get Texto() { return this._Texto; }
  get Icone() { return this._Icone; }
  get Foto() { return this._Foto; }
  get Data() { return this._Data; }

  set ID_post(value) { this._ID_post = value; }
  set ID_usuario(value) { this._ID_usuario = value; }
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
      ID_usuario: this.ID_usuario,
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
    post.ID_usuario = json.ID_usuario;
    post.Titulo = json.Titulo;
    post.Texto = json.Texto;
    post.Icone = json.Icone;
    post.Foto = json.Foto;
    post.Data = json.Data;
    return post;
  }

  async checkCurtidoPor(usuario) {
    const curtidas = await this.extractCurtidas();
    return curtidas.some(curtida => curtida.ID_Usuario === usuario.ID_usuario);
  }

  async extractQntCurtidas() {
    return (await this.extractCurtidas()).length;
  }

  async extractCurtidas() {
    const curtidas = await Utils.searchCurtidas_posts();
    const arr = [];
    curtidas.forEach(curtida => {
      if (curtida.ID_Post === this.ID_post) {
        arr.push(curtida);
      }
    });

    return arr; 
  }

  async extractComentarios() {
    const comentarios = await Utils.searchComentarios();
    const arr = [];
    comentarios.forEach(comentario => {
      if (comentario.ID_post === this.ID_post) {
        arr.push(comentario);
      }
    });

    return arr; 
  }
  
  async extractFiltros() {
    const filtros = await Utils.searchFiltros();
    const arr = [];
    filtros.forEach(filtro => {
      if (filtro.ID_Post === this.ID_post) {
        arr.push(filtro);
      }
    });

    return arr; 
  }
  
  async extractUsuario() {
    const user = await Classes.Usuario.fromID(this.ID_usuario)
    return user;
  }
    
  static async fromID(ID) {
    const post = Post.fromJSON(await searchPost(ID));
    return post;
  }
}