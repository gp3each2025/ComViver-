import { insertFirebase, removeFirebase, searchCurtida_post } from '../Utils/firebase.js';
import * as Classes from './index.js'

export class Curtida_post {
  constructor() {
    this._ID_Curtida_post = null;
    this._ID_Post = null;
    this._ID_Usuario = null;
  }

  get ID_Curtida_post() { return this._ID_Curtida_post; }
  get ID_Post() { return this._ID_Post; }
  get ID_Usuario() { return this._ID_Usuario; }

  set ID_Curtida_post(value) { this._ID_Curtida_post = value; }
  set ID_Post(value) { this._ID_Post = value; }
  set ID_Usuario(value) { this._ID_Usuario = value; }

  insertData() {
    insertFirebase(`Curtidas_posts/${this.ID_Curtida_post}`, this.toJSON());
  }

  removeData() {
    removeFirebase(`Curtidas_posts/${this.ID_Curtida_post}`);
  }

  toJSON() {
    return {
      ID_Curtida_post: this.ID_Curtida_post,
      ID_Post: this.ID_Post,
      ID_Usuario: this.ID_Usuario
    };
  }

  static fromJSON(json) {
    const curtida_post = new Curtida_post();
    curtida_post.ID_Curtida_post = json.ID_Curtida_post;
    curtida_post.ID_Post = json.ID_Post;
    curtida_post.ID_Usuario = json.ID_Usuario;
    return curtida_post;
  }

  async extractPost() {
    const post = await Classes.Post.fromID(this.ID_Post)
    return post;
  }

  async extractUsuario() {
    const user = await Classes.Usuario.fromID(this.ID_Usuario)
    return user;
  }

  static async fromID(ID) {
    const curtida_post = Curtida_post.fromJSON(await searchCurtida_post(ID));
    return curtida_post;
  }
}
