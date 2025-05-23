// Classes/post.js
import { FIREBASE_PATHS, insertFirebase, removeFirebase, searchPost as searchPostData, getCurrentUser } from '../Utils/firebase.js';
import { Comentario } from './comentario.js'; 
import { Usuario } from './usuario.js';   

export class Post {
  constructor() {
    this._ID_post = null;
    this._ID_usuario = null; 
    this._Titulo = null;
    this._Texto = null;
    this._Icone = null;
    this._Foto = null;
    this._Data = null;
    this._Comentarios = {}; 
    this._Curtidas = {};   
    this._Filtros = {};
    this._qntComentarios = 0;
    this._qntCurtidas = 0;
  }

  get ID_post() { return this._ID_post; }
  get ID_usuario() { return this._ID_usuario; }
  get Titulo() { return this._Titulo; }
  get Texto() { return this._Texto; }
  get Icone() { return this._Icone; }
  get Foto() { return this._Foto; }
  get Data() { return this._Data; }
  get Comentarios() { return this._Comentarios; }
  get Curtidas() { return this._Curtidas; }
  get Filtros() { return this._Filtros; }

  get qntComentarios() { return this._qntComentarios; }
  get qntCurtidas() { return this._qntCurtidas; }

  set ID_post(value) { this._ID_post = value; }
  set ID_usuario(value) { this._ID_usuario = value; }
  set Titulo(value) { if(typeof value !== 'string' || !value.trim()) throw new Error("Título inválido"); this._Titulo = value.trim(); }
  set Texto(value) { if(typeof value !== 'string' || !value.trim()) throw new Error("Texto inválido"); this._Texto = value.trim(); }
  set Icone(value) { this._Icone = value; }
  set Foto(value) { this._Foto = value; }
  set Data(value) { this._Data = value; }

  async insertData() {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("Usuário não autenticado para criar post.");
    this.ID_usuario = currentUser.uid;

    if (!this.ID_post) this.ID_post = `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    if (!this.Data) this.Data = new Date().toISOString();

    this._qntComentarios = Object.keys(this._Comentarios).length;
    this._qntCurtidas = Object.keys(this._Curtidas).length;

    const postPath = FIREBASE_PATHS.getPostPath(this.ID_post);
    await insertFirebase(postPath, this.toJSON());
  }

  async removeData() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.uid !== this.ID_usuario) {
      throw new Error("Não autorizado a remover este post.");
    }
    const postPath = FIREBASE_PATHS.getPostPath(this.ID_post);
    await removeFirebase(postPath);
  }

  toJSON() { 
    return {
      ID_post: this.ID_post, 
      ID_usuario: this.ID_usuario,
      Titulo: this.Titulo,
      Texto: this.Texto,
      Icone: this.Icone,
      Foto: this.Foto,
      Data: this.Data,
      qntComentarios: this.qntComentarios,
      qntCurtidas: this.qntCurtidas,
      Filtros: this.Filtros,
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

    if (json.Comentarios) {
      post._Comentarios = Object.entries(json.Comentarios).reduce((acc, [id, comData]) => {
        acc[id] = Comentario.fromJSON({ ...comData, ID_comentario: id, ID_post: post.ID_post });
        return acc;
      }, {});
    }
    if (json.Curtidas) post._Curtidas = json.Curtidas; else post._Curtidas = {};
    if (json.Filtros) post._Filtros = json.Filtros; else post._Filtros = {};

    post._qntComentarios = json.qntComentarios !== undefined ? json.qntComentarios : Object.keys(post._Comentarios).length;
    post._qntCurtidas = json.qntCurtidas !== undefined ? json.qntCurtidas : Object.keys(post._Curtidas).length;
    return post;
  }

  async curtir() {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("Usuário não autenticado para curtir.");
    const userId = currentUser.uid;

    const curtidaUsuarioPath = FIREBASE_PATHS.getCurtidaUsuarioPostPath(this.ID_post, userId);
    if (this._Curtidas[userId]) { 
      await removeFirebase(curtidaUsuarioPath);
      delete this._Curtidas[userId];
      this._qntCurtidas = Math.max(0, this._qntCurtidas - 1);
    } else { 
      await insertFirebase(curtidaUsuarioPath, true); 
      this._Curtidas[userId] = true;
      this._qntCurtidas += 1;
    }
    await insertFirebase(`${FIREBASE_PATHS.getPostPath(this.ID_post)}/qntCurtidas`, this._qntCurtidas);
  }

  checkCurtidoPor(userId) {
    if (!userId) return false;
    return !!this._Curtidas[userId];
  }

  async adicionarComentario(textoComentario) {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("Usuário não autenticado para comentar.");
    if (typeof textoComentario !== 'string' || !textoComentario.trim()) {
        throw new Error("Texto do comentário inválido.");
    }

    const novoComentario = new Comentario();
    novoComentario.ID_post = this.ID_post;
    novoComentario.ID_usuario = currentUser.uid;
    novoComentario.Texto = textoComentario.trim();
    novoComentario.Data = new Date().toISOString();
    novoComentario.ID_comentario = `com_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const comentarioPath = FIREBASE_PATHS.getComentarioPath(this.ID_post, novoComentario.ID_comentario);
    await insertFirebase(comentarioPath, novoComentario.toJSON());
    this._Comentarios[novoComentario.ID_comentario] = novoComentario;
    this._qntComentarios +=1;

    await insertFirebase(`${FIREBASE_PATHS.getPostPath(this.ID_post)}/qntComentarios`, this._qntComentarios);
    return novoComentario;
  }

  async removerComentario(comentarioId) {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("Usuário não autenticado.");

    const comentario = this._Comentarios[comentarioId];
    if (!comentario) throw new Error("Comentário não encontrado.");

    if (currentUser.uid !== this.ID_usuario && currentUser.uid !== comentario.ID_usuario) {
        throw new Error("Não autorizado a remover este comentário.");
    }

    const comentarioPath = FIREBASE_PATHS.getComentarioPath(this.ID_post, comentarioId);
    await removeFirebase(comentarioPath);
    delete this._Comentarios[comentarioId];
    this._qntComentarios = Math.max(0, this._qntComentarios -1);

    await insertFirebase(`${FIREBASE_PATHS.getPostPath(this.ID_post)}/qntComentarios`, this._qntComentarios);
  }

  async extractUsuario() {
    if (!this.ID_usuario) return null;
    return Usuario.loadProfile(this.ID_usuario);
  }

  static async fromID(postId) {
    if (!postId) throw new Error("PostID é necessário.");
    const postData = await searchPostData(postId);
    if (postData) {
      return Post.fromJSON({ ...postData, ID_post: postId });
    }
    return null;
  }
}
