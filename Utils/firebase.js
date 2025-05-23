import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

import { getDatabase, ref, get, child, set, remove, query, orderByChild } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import * as Classes from '../Classes/index.js';

// Cole sua firebaseConfig aqui
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
const auth = getAuth(app);
const db = getDatabase(app);

// --- FUNÇÕES DE AUTENTICAÇÃO ---
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

// --- CONSTANTES PARA CAMINHOS ---
export const FIREBASE_PATHS = {
  USUARIOS: 'Usuários',
  POSTS: 'Posts',
  getUsuarioPath: (userId) => `${FIREBASE_PATHS.USUARIOS}/${userId}`,
  getPostPath: (postId) => `${FIREBASE_PATHS.POSTS}/${postId}`,
  getComentariosPostPath: (postId) => `${FIREBASE_PATHS.POSTS}/${postId}/Comentarios`,
  getComentarioPath: (postId, comentarioId) => `${FIREBASE_PATHS.POSTS}/${postId}/Comentarios/${comentarioId}`,
  getCurtidasPostPath: (postId) => `${FIREBASE_PATHS.POSTS}/${postId}/Curtidas`,
  getCurtidaUsuarioPostPath: (postId, userId) => `${FIREBASE_PATHS.POSTS}/${postId}/Curtidas/${userId}`,
  getCurtidasComentarioPath: (postId, comentarioId) => `${FIREBASE_PATHS.POSTS}/${postId}/Comentarios/${comentarioId}/Curtidas`,
  getCurtidaUsuarioComentarioPath: (postId, comentarioId, userId) => `${FIREBASE_PATHS.POSTS}/${postId}/Comentarios/${comentarioId}/Curtidas/${userId}`,
  getFiltrosPostPath: (postId) => `${FIREBASE_PATHS.POSTS}/${postId}/Filtros`,
};

// --- FUNÇÕES DE DADOS ---
export async function insertFirebase(path, value) {
  const caminhoRef = ref(db, path);
  try {
    await set(caminhoRef, value);
    console.log(`✅ Valor inserido com sucesso em ${path}`);
  } catch (error) {
    console.error(`❌ Erro ao inserir dados em ${path}:`, error);
    throw error;
  }
}

export async function removeFirebase(path) {
  const caminhoRef = ref(db, path);
  try {
    await remove(caminhoRef);
    console.log(`🗑️ Registro removido com sucesso de ${path}`);
  } catch (error) {
    console.error(`❌ Erro ao remover dados de ${path}:`, error);
    throw error;
  }
}

// Busca dados do perfil de um usuário
export async function searchUsuario(userId) {
  const userPath = FIREBASE_PATHS.getUsuarioPath(userId);
  try {
    const snapshot = await get(ref(db, userPath));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.warn(`⚠️ Perfil de usuário com ID ${userId} não encontrado em ${userPath}.`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Erro ao buscar perfil de usuário ${userId}:`, error);
    throw error;
  }
}

// Busca dados de um post específico
export async function searchPost(postId) {
  const postPath = FIREBASE_PATHS.getPostPath(postId);
  try {
    const snapshot = await get(ref(db, postPath));
    if (snapshot.exists()) {
      return snapshot.val(); // Retorna o objeto completo do post
    } else {
      console.warn(`⚠️ Post com ID ${postId} não encontrado.`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Erro ao buscar post ${postId}:`, error);
    throw error;
  }
}

// Busca todos os posts (considerar paginação para grandes volumes)
export async function searchPosts() {
  try {
    const postsRef = ref(db, FIREBASE_PATHS.POSTS);
    const snapshot = await get(postsRef); 

    if (snapshot.exists()) {
      const postsObj = snapshot.val();
      return Object.entries(postsObj).map(([id, postData]) =>
        Classes.Post.fromJSON({ ...postData, ID_post: id }) // Garante que o ID_post está no objeto
      );
    } else {
      console.warn("⚠️ Nenhum post encontrado.");
      return [];
    }
  } catch (error) {
    console.error("❌ Erro ao buscar todos os posts:", error);
    throw error;
  }
}