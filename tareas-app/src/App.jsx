// tareas-app/src/App.jsx
import { useState } from "react";
import axios from "axios";
import { bd, llamarEliminarPorId } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function App() {
  const [ultimaId, setUltimaId] = useState(null);
  const refTareas = collection(bd, "tasks"); // coleccion de prueba

  // agrega un documento y enriquece datos con axios antes de guardar
  const agregarTarea = async () => {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/todos/2");
    const docRef = await addDoc(refTareas, {
      nombre: "mi tarea",
      fechaLimite: new Date(Date.now() + 86400000).toISOString(),
      prioridadSugerida: resp.data?.title || "sin datos",
      creadaEn: new Date().toISOString(),
    });
    setUltimaId(docRef.id);
    alert("guardada: " + docRef.id);
  };

  // lista cuantos documentos hay
  const listarTareas = async () => {
    const snap = await getDocs(refTareas);
    alert("total tareas: " + snap.size);
  };

  // llama a la function del emulador para borrar por id
  const eliminarUltima = async () => {
    if (!ultimaId) return alert("no hay id para borrar");
    await llamarEliminarPorId("tasks", ultimaId);
    alert("eliminada: " + ultimaId);
    setUltimaId(null);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>prueba con emuladores </h1>
      <p>botones para probar firestore y functions en local</p>
      <button onClick={agregarTarea}>agregar tarea</button>{" "}
      <button onClick={listarTareas}>listar tareas</button>{" "}
      <button onClick={eliminarUltima}>eliminar ultima</button>
      <p>id reciente: {ultimaId ?? "(ninguno)"} </p>
    </div>
  );
}
