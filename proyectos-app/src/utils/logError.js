import { bd } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Guarda un registro de error en la colección 'app_errors' de Firestore.
 * @param {Error} error El objeto de error capturado.
 * @param {string} componente El nombre del componente donde ocurrió el error.
 * @param {object|null} infoUsuario Información adicional del usuario si está disponible.
 */
export const registrarErrorEnFirestore = async (error, componente, infoUsuario = null) => {
  try {
    console.error(`Error en ${componente}:`, error); // También lo mantenemos en la consola del navegador

    await addDoc(collection(bd, 'app_errors'), {
      message: error.message,
      stack: error.stack,
      componente: componente,
      infoUsuario: infoUsuario ? { uid: infoUsuario.uid, email: infoUsuario.email } : null,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
    });
  } catch (errorDeRegistro) {
    console.error('Error al intentar registrar el error en Firestore:', errorDeRegistro);
  }
};
