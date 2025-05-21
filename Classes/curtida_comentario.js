import { insertFirebase, removeFirebase } from '../Utils/firebase.js';

export class Curtida_comentario {
  constructor() {
    this._ID_Curtida_comentario = null;
    this._ID_Usuario = null;
    this._ID_Comentario = null;
  }

  get ID_Curtida_comentario() { return this._ID_Curtida_comentario; }
  get ID_Usuario() { return this._ID_Usuario; }
  get ID_Comentario() { return this._ID_Comentario; }

  set ID_Curtida_comentario(value) { this._ID_Curtida_comentario = value; }
  set ID_Usuario(value) { this._ID_Usuario = value; }
  set ID_Comentario(value) { this._ID_Comentario = value; }

  insertData() {
    insertFirebase(`Curtidas_comentarios/${this.ID_Curtida_comentario}`, this.toJSON());
  }

  removeData() {
    removeFirebase(`Curtidas_comentarios/${this.ID_Curtida_comentario}`);
  }

  toJSON() {
    return {
      ID_Curtida_comentario: this.ID_Curtida_comentario,
      ID_Usuario: this.ID_Usuario,
      ID_Comentario: this.ID_Comentario,
    };
  }

  static fromJSON(json) {
    const curtida_comentario = new Curtida_comentario();
    curtida_comentario.ID_Curtida_comentario = json.ID_Curtida_comentario;
    curtida_comentario.ID_Usuario = json.ID_Usuario;
    curtida_comentario.ID_Comentario = json.ID_Comentario;
    return curtida_comentario;
  }
}
