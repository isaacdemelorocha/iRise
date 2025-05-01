import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Cole aqui sua configuração do Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyCO_j3ERe7CBOZaWzYeBCWzt41fkYTRqQk",
  authDomain: "prjbd-ccdff.firebaseapp.com",
  projectId: "prjbd-ccdff",
  storageBucket: "prjbd-ccdff.firebasestorage.app",
  messagingSenderId: "214422954091",
  appId: "1:214422954091:web:485a660b1b27b28f8c112e"
};

// Inicialização
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lógica do formulário
document.getElementById("certificadoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();

  if (!nome) return alert("Digite um nome válido.");

  try {
    await addDoc(collection(db, "nomes"), {
      nome: nome,
      data: new Date().toISOString()
    });
    alert("Nome salvo com sucesso!");
    document.getElementById("form-nome").reset();
  } catch (error) {
    console.error("Erro ao salvar: ", error);
    alert("Erro ao salvar o nome.");
  }
});
