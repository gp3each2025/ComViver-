import { insertFirebase, removeFirebase, searchFiltro } from '../Utils/firebase.js';
import * as Classes from './index.js'

export class Filtro {
  constructor() {
    this._ID_Filtro = null;
    this._ID_Post = null;
    this._Filtro = null;
  }

  get ID_Filtro() { return this._ID_Filtro; }
  get ID_Post() { return this._ID_Post; }
  get Filtro() { return this._Filtro; }

  set ID_Filtro(value) { this._ID_Filtro = value; }
  set ID_Post(value) { this._ID_Post = value; }
  set Filtro(value) { this._Filtro = value; }

  insertData() { insertFirebase(`Filtros/${this._ID_Filtro}`, this.toJSON()); }

  removeData() { removeFirebase(`Filtros/${this._ID_Filtro}`); }

  toJSON() {
    return {
      ID_Filtro: this.ID_Filtro,
      ID_Post: this.ID_Post,
      Filtro: this.Filtro,
    };
  }

  static fromJSON(json) {
    const filtro = new Filtro();
    filtro.ID_Filtro = json.ID_Filtro;
    filtro.ID_Post = json.ID_Post;
    filtro.Filtro = json.Filtro;
    return filtro;
  }

  async extractPost() {
    const post = await Classes.Post.fromID(this.ID_Post)
    return post;
  }

  static async fromID(ID) {
    const filtro = Filtro.fromJSON(await searchFiltro(ID));
    return filtro;
  }
}