export class Filtro {
  constructor(nome, valor = true) { // Exemplo simples: nome do filtro e um valor (pode ser booleano ou outro)
    this._Nome = nome;
    this._Valor = valor; // Poderia ser um objeto com mais detalhes
  }

  get Nome() { return this._Nome; }
  get Valor() { return this._Valor; }

  set Nome(value) {
    if (typeof value !== 'string' || !value.trim()) throw new Error("Nome de filtro inválido");
    this._Nome = value.trim();
  }
  set Valor(value) { this._Valor = value; }

  toJSON() {
    return {
      Nome: this.Nome,
      Valor: this.Valor,
    };
  }

  static fromJSON(json) {
    if (!json || !json.Nome) throw new Error("Dados JSON inválidos para criar Filtro.");
    return new Filtro(json.Nome, json.Valor);
  }
}

// Uso na classe Post:
// this._Filtros = {
//   "tecnologia": new Filtro("tecnologia").toJSON(), // Salvar o JSON
//   "saude": new Filtro("saude", { prioridade: 1 }).toJSON()
// };
// Ou mais simples, se não precisar da classe Filtro:
// this._Filtros = { "tecnologia": true, "saude": true };
