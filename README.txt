const user = Usuario.fromJSON(await searchUsuario(ID)) - buscar usuário no banco de dados por ID
const user = Usuario.fromJSON - extração de usuário ao banco de dados
user.removeData() - exclusão do usuário ao banco de dados
user.insertData() - inserção do usuário ao banco de dados
user.(atributo) - acesso ao atributo de um usuário

preview.innerHTML = `<img src="${user.Icone}" width="100">`; - inserção da imagem base64 no html

import * as Utils from './Utils/index.js'; - Utils.(função)
import * as Classes from './Classes/index.js' - Classes.(classe)