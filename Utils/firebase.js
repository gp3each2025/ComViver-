// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getDatabase, ref, get, child, set, remove } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import * as Classes from '../Classes/index.js'

const firebaseConfig = {
  apiKey: "AIzaSyDoOH7VoPD3ro0avIZSkFFzlv7b6Jvtw9w",
  authDomain: "grupo3rp-66e17.firebaseapp.com",
  projectId: "grupo3rp-66e17",
  storageBucket: "grupo3rp-66e17.appspot.com",
  messagingSenderId: "148178216687",
  appId: "1:148178216687:web:6c1db583ff555a09e55d1a",
  measurementId: "G-L4RLPCDXWQ",
  databaseURL: "https://grupo3rp-66e17-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔎 Função para buscar dados
export async function buscarDadosTabela(tabela) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, tabela));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
}

// ✅ Função para inserir dados
export async function insertFirebase(campo, valor) {
  const caminhoRef = ref(db, campo);
  try {
    await set(caminhoRef, valor);
    console.log(`✅ Valor inserido com sucesso em ${campo}`);
  } catch (error) {
    console.error("❌ Erro ao inserir dados:", error);
  }

}

export async function removeFirebase(campo) {
  const caminhoRef = ref(db, campo);
  try {
    await remove(caminhoRef);
    console.log(`🗑️ Registro removido com sucesso de ${campo}`);
  } catch (error) {
    console.error("❌ Erro ao remover dados:", error);
  }
}
    
export async function searchUsuario(id) {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, `Usuários/${id}`));
        if (snapshot.exists()) {
          return snapshot.val(); 
        } else {
          console.warn(`⚠️ Usuário com ID ${id} não encontrado.`);
          return null;
        }
      } catch (error) {
        console.error("❌ Erro ao buscar usuário:", error);
        return null;
      }
}

export async function searchPost(id) {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, `Posts/${id}`));
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.warn(`⚠️ Post com ID ${id} não encontrado.`);
          return null;
        }
      } catch (error) {
        console.error("❌ Erro ao buscar post:", error);
        return null;
      }
    }

export async function searchFiltro(id) {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, `Filtros/${id}`));
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.warn(`⚠️ Filtro com ID ${id} não encontrado.`);
          return null;
        }
      } catch (error) {
        console.error("❌ Erro ao buscar filtro:", error);
        return null;
      }
    }

export async function searchCurtida_post(id) {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, `Curtidas_posts/${id}`));
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.warn(`⚠️ Curtida_post com ID ${id} não encontrado.`);
          return null;
        }
      } catch (error) {
        console.error("❌ Erro ao buscar curtida_post:", error);
        return null;
      }
    }
  
export async function searchCurtida_comentario(id) {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, `Curtidas_comentarios/${id}`));
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.warn(`⚠️ Curtida_comentario com ID ${id} não encontrado.`);
          return null;
        }
      } catch (error) {
        console.error("❌ Erro ao buscar curtida_comentario:", error);
        return null;
      }
    }

export async function searchComentario(id) {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, `Comentários/${id}`));
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.warn(`⚠️ Comentário com ID ${id} não encontrado.`);
          return null;
        }
      } catch (error) {
        console.error("❌ Erro ao buscar comentário:", error);
        return null;
      }
    }

  export async function searchPosts() {
    const dbRef = ref(db);
    try {
      const snapshot = await get(child(dbRef, 'Posts'));
      if (snapshot.exists()) {
        const postsObj = snapshot.val(); 
        const postsArray = Object.values(postsObj).map(postData => Classes.Post.fromJSON(postData));
        return postsArray; 
      } else {
        console.warn("⚠️ Nenhum post encontrado.");
        return [];
      }
    } catch (error) {
      console.error("❌ Erro ao buscar todos os posts:", error);
      return [];
    }
  }

  export async function searchComentarios() {
    const dbRef = ref(db);
    try {
      const snapshot = await get(child(dbRef, 'Comentários'));
      if (snapshot.exists()) {
        const postsObj = snapshot.val();
        const postsArray = Object.values(postsObj).map(data => Classes.Comentario.fromJSON(data));
        return postsArray;
      } else {
        console.warn("⚠️ Nenhum comentário encontrado.");
        return [];
      }
    } catch (error) {
      console.error("❌ Erro ao buscar todos os comentários:", error);
      return [];
    }
  }

  export async function searchFiltros() {
    const dbRef = ref(db);
    try {
      const snapshot = await get(child(dbRef, 'Filtros'));
      if (snapshot.exists()) {
        const postsObj = snapshot.val(); 
        const postsArray = Object.values(postsObj).map(data => Classes.Filtro.fromJSON(data));
        return postsArray; 
      } else {
        console.warn("⚠️ Nenhum filtro encontrado.");
        return [];
      }
    } catch (error) {
      console.error("❌ Erro ao buscar todos os filtros:", error);
      return [];
    }
  }

  export async function searchCurtidas_posts() {
    const dbRef = ref(db);
    try {
      const snapshot = await get(child(dbRef, 'Curtidas_posts'));
      if (snapshot.exists()) {
        const postsObj = snapshot.val(); 
        const postsArray = Object.values(postsObj).map(data => Classes.Curtida_post.fromJSON(data));
        return postsArray; 
      } else {
        console.warn("⚠️ Nenhuma curtida de post encontrada.");
        return [];
      }
    } catch (error) {
      console.error("❌ Erro ao buscar todos as curtidas de posts:", error);
      return [];
    }
  }

  export async function searchCurtidas_comentarios() {
    const dbRef = ref(db);
    try {
      const snapshot = await get(child(dbRef, 'Curtidas_comentarios'));
      if (snapshot.exists()) {
        const postsObj = snapshot.val(); 
        const postsArray = Object.values(postsObj).map(data => Classes.Curtida_comentario.fromJSON(data));
        return postsArray; 
      } else {
        console.warn("⚠️ Nenhuma curtida de comentário encontrada.");
        return [];
      }
    } catch (error) {
      console.error("❌ Erro ao buscar todos as curtidas de comentários:", error);
      return [];
    }
  }