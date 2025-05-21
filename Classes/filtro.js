import { insertFirebase, removeFirebase } from '../Utils/firebase.js';

export class Filtro {
  constructor() {
    this._ID_Filtro = null;
    this._Filtro = null;
  }

  get ID_Filtro() { return this._ID_Filtro; }
  get Filtro() { return this._Filtro; }

  set ID_Filtro(value) { this._ID_Filtro = value; }
  set Filtro(value) { this._Filtro = value; }

  insertData() { insertFirebase(`Filtros/${this._ID_Filtro}`, this.toJSON()); }

  removeData() { removeFirebase(`Filtros/${this._ID_Filtro}`); }
    
  toJSON() {
    return {
      ID_Filtro: this.ID_Filtro,
      Filtro: this.Filtro,
    };
  }

  static fromJSON(json) {
    const filtro = new Filtro();
    filtro.ID_Filtro = json.ID_Filtro;
    filtro.Filtro = json.Filtro;
    return filtro;
  }
}