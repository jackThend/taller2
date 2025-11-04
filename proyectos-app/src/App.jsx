// proyectos-app/src/App.jsx
import { useState } from "react";
import axios from "axios";
import { bd, llamarEliminarPorId } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function App() {
  const [ultimaId, setUltimaId] = useState(null);
  const refProyectos = collection(bd, "projects"); // coleccion de prueba

  // agrega un documento y enriquece datos con axios antes de guardar
  const agregarProyecto = async () => {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    const docRef = await addDoc(refProyectos, {
      nombre: "mi proyecto",
      descripcion: "descripcion de prueba con al menos 10 caracteres",
      infoExtra: resp.data?.title || "sin datos",
      creadoEn: new Date().toISOString(),
    });
    setUltimaId(docRef.id);
    alert("guardado: " + docRef.id);
  };

  // lista cuantos documentos hay
  const listarProyectos = async () => {
    const snap = await getDocs(refProyectos);
    alert("total proyectos: " + snap.size);
  };

  // llama a la function del emulador para borrar por id
  const eliminarUltimo = async () => {
    if (!ultimaId) return alert("no hay id para borrar");
    await llamarEliminarPorId("projects", ultimaId);
    alert("eliminado: " + ultimaId);
    setUltimaId(null);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>prueba con emuladores</h1>
      <p>botones para probar firestore y functions en local</p>
      <button onClick={agregarProyecto}>agregar proyecto</button>{" "}
      <button onClick={listarProyectos}>listar proyectos</button>{" "}
      <button onClick={eliminarUltimo}>eliminar ultimo</button>
      <p>id reciente: {ultimaId ?? "(ninguno)"} </p>
    </div>
  );
}
