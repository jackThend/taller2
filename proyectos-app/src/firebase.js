// src/firebase.js
// importa sdk de cliente y conecta a emuladores locales
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzlbpPkQ7bHY_SJbZIEKZJ2rJfCMY4Qws",
  authDomain: "taller2-israel.firebaseapp.com",
  projectId: "taller2-israel",
  storageBucket: "taller2-israel.firebasestorage.app",
  messagingSenderId: "901588710263",
  appId: "1:901588710263:web:d25cf436214f9bfd58a772"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// inicializa servicios
export const bd = getFirestore(app);
export const funciones = getFunctions(app, "us-central1");

// conecta a emuladores
if (location.hostname === "localhost") {
  connectFirestoreEmulator(bd, "127.0.0.1", 8080);
  connectFunctionsEmulator(funciones, "127.0.0.1", 5001);
}

// funcion oncall del backend
export async function llamarEliminarPorId(coleccion, id) {
  // elimina un documento por id usando la funcion del backend
  const fn = httpsCallable(funciones, "eliminarPorId");
  const res = await fn({ coleccion, id });
  return res.data;
}
