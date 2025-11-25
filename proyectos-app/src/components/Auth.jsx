import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { registrarErrorEnFirestore } from '../utils/logError'; // Importar con el nuevo nombre

const Auth = ({ usuario }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [esModoLogin, setEsModoLogin] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const gestionarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      if (esModoLogin) {
        await signInWithEmailAndPassword(auth, email, contrasena);
      } else {
        await createUserWithEmailAndPassword(auth, email, contrasena);
      }
    } catch (err) {
      setError(err.message);
      registrarErrorEnFirestore(err, 'Auth', usuario); // Usar la función renombrada
    } finally {
      setCargando(false);
    }
  };

  const gestionarLogout = async () => {
    setCargando(true);
    setError('');
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      registrarErrorEnFirestore(err, 'Auth', usuario); // Usar la función renombrada
    } finally {
      setCargando(false);
    }
  };

  if (usuario) {
    return (
      <div className="card">
        <div className="card-body">
          <p className="card-title">Bienvenido, <strong>{usuario.email}</strong></p>
          <button className="btn btn-danger" onClick={gestionarLogout} disabled={cargando}>
            {cargando ? 'Cerrando sesión...' : 'Cerrar Sesión'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a 
              className={`nav-link ${esModoLogin ? 'active' : ''}`}
              href="#"
              onClick={() => { setError(''); setEsModoLogin(true); }}
            >
              Iniciar Sesión
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${!esModoLogin ? 'active' : ''}`}
              href="#"
              onClick={() => { setError(''); setEsModoLogin(false); }}
            >
              Registrar
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <form onSubmit={gestionarSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña (mínimo 6 caracteres)"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={cargando}>
            {cargando ? 'Procesando...' : (esModoLogin ? 'Iniciar Sesión' : 'Registrar')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
