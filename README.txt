# RESUMO DO GUIA
1. Como importar as classes e as utildades
2. Como criar uma classe
3. Como procurar uma classe por ID
4. Funções comuns a todas as classes
5. Funções para extração de classes
6. Funções para extração geral do banco de dados
7. Exemplos úteis
8. Módulo para inserção de imagem
9. Como inserir uma imagem base64 no html


[#1] Como importar as classes e as utilidades:
import * as Utils from './Utils/index.js'; - Utils.(função)
import * as Classes from './Classes/index.js' - Classes.(classe)


[#2] Como criar uma classe
const (nome) = new Classes.(classe)();
(nome).(atributo) = (valor);
filtro.insertData();


[#3] Como procurar uma classe por um ID
const search = await Classes.(classe).fromID((id));


[#4] Funções comuns a todas as classes:
1. await insertData() - insere a classe no banco de dados 
2. await removeData() - remove a classe no banco de dados
3. await toJSON() - converte a classe pro formato JSON
4. await fromJSON() - converte um JSON pro formato de uma classe
5. await fromID() - procura uma classe no banco de dados pelo ID


[#5] Funções para extração de classes:
1. await extractPost() - se a classe possui ID_Post, retorna a classe post respectiva
2. await extractUsuario() - se a classe possui ID_Usuario, retorna a classe usuario respectiva
3. await extractComentario() - se a classe possui ID_Comentario, retorna a classe comentario respectiva
4. await extractQntCurtidas() - retorna a quantidade de curtidas, apenas na classe post ou comentário
5. await extractCurtidas() - retorna a lista de curtidas, apenas na classe post ou comentário
6. await checkCurtidoPor(usuario) - retorna se o usuário curtiu, apenas na classe post ou comentário
7. await extractFiltros() - extrai a lista de filtros, apenas na classe post


[#6] Funções para extração geral do banco de dados
1. await Utils.searchUsuarios() - extrai todos os usuarios do banco de dados, já como classe
2. await Utils.searchPosts() - extrai todos os posts do banco de dados, já como classe
3. await Utils.searchFiltros() - extrai todos os posts do banco de dados, já como classe
4. await Utils.searchCurtidas_posts() - extrai todos os comentarios do banco de dados, já como classe
5. await Utils.searchCurtidas_comentarios() - extrai todos os posts do banco de dados, já como classe
6. await Utils.searchComentarios() - extrai todos os comentarios do banco de dados, já como classe


[#7] Exemplos úteis
1 - Como acessar uma classe dentro de outra classe
console.log("-> " + (await (await search_curtida_comentario.extractComentario()).extractPost()).Texto);

2 - Iterando (encurtado) por uma lista
const filtros = await search_post.extractFiltros();
filtros.forEach(filtro => console.log("-> " + filtro.Filtro));

3 - Iterando (extenso) por uma extração geral
const (posts) = await Utils.searchPosts();
posts.forEach(post => {
    console.log(post.Texto);
});


[#8] Módulo para inserção de imagem
<label for="imagemInput">Selecionar imagem:</label>
<input type="file" id="imagemInput" accept="image/*">

const file = inputImagem.files[0];
if (file) {
    const base64 = await Utils.imagemParaBase64(file);
    console.log("Imagem convertida em Base64:", base64);
    preview.innerHTML = `<img src="${base64}" width="100">`;
    user.Icone = base64;
} else {
    alert("Nenhuma imagem selecionada.");
    return;
}


[#9] Como inserir uma imagem base64 no html
preview.innerHTML = `<img src="${user.Icone}" width="100">`; - inserção da imagem base64 no html