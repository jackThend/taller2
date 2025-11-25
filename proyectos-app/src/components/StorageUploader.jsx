import React, { useState } from 'react';
import { bd } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { registrarErrorEnFirestore } from '../utils/logError';

const StorageUploader = ({ usuario }) => {
  const [archivo, setArchivo] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const gestionarCambioArchivo = (e) => {
    const archivoSeleccionado = e.target.files[0];
    if (archivoSeleccionado) {
      setArchivo(archivoSeleccionado);
      setError('');
      setMensajeExito('');
    }
  };

  const gestionarSubida = async () => {
    if (!archivo) {
      setError('Por favor selecciona un archivo primero.');
      return;
    }
    setSubiendo(true);
    setError('');
    setMensajeExito('');

    try {
      const metadatosArchivo = {
        name: archivo.name,
        size: archivo.size,
        type: archivo.type,
        simulatedPath: `simulated/uploads/${usuario.uid}/${archivo.name}`,
        uploadedAt: serverTimestamp(),
        uploaderUid: usuario.uid,
        uploaderEmail: usuario.email,
      };

      await addDoc(collection(bd, 'cargas_de_archivos'), metadatosArchivo);
      
      setMensajeExito('¡Simulación de carga exitosa! Los metadatos del archivo se guardaron en Firestore.');
    } catch (err) {
      const mensajeError = 'Error al guardar metadatos: ' + err.message;
      setError(mensajeError);
      registrarErrorEnFirestore(err, 'StorageUploader (Simulated)', usuario);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Simulador de Carga de Archivos</h2>
        <p className="card-subtitle mb-2 text-muted">Esto guardará los metadatos del archivo en Firestore.</p>
        <div className="mb-3">
          <input className="form-control" type="file" onChange={gestionarCambioArchivo} disabled={subiendo} />
        </div>
        <button className="btn btn-primary" onClick={gestionarSubida} disabled={!archivo || subiendo}>
          {subiendo ? 'Guardando Metadatos...' : 'Guardar Metadatos de Archivo'}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {mensajeExito && <div className="alert alert-success mt-3">{mensajeExito}</div>}
      </div>
    </div>
  );
};

export default StorageUploader;
