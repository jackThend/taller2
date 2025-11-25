import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { bd } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const ContactForm = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [, forceUpdate] = useState();

  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'El campo :attribute es obligatorio.',
      email: 'El email no es válido.'
    },
    autoForceUpdate: { forceUpdate: forceUpdate }
  }));

  const gestionarEnvio = async (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      try {
        const refDocumento = await addDoc(collection(bd, 'contactos'), {
          nombre,
          email,
          mensaje,
          fecha: new Date().toISOString()
        });
        alert('¡Formulario enviado con éxito! ID: ' + refDocumento.id);
        setNombre('');
        setEmail('');
        setMensaje('');
        validator.current.hideMessages();
      } catch (error) {
        console.error("Error al guardar en Firestore: ", error);
        alert('Ocurrió un error al enviar el formulario.');
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">Formulario de Contacto</h2>
        <form onSubmit={gestionarEnvio}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={() => validator.current.showMessageFor('nombre')}
            />
            {validator.current.message('nombre', nombre, 'required', { className: 'text-danger' })}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validator.current.showMessageFor('email')}
            />
            {validator.current.message('email', email, 'required|email', { className: 'text-danger' })}
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje:</label>
            <textarea
              className="form-control"
              id="mensaje"
              rows="3"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              onBlur={() => validator.current.showMessageFor('mensaje')}
            ></textarea>
            {validator.current.message('mensaje', mensaje, 'required', { className: 'text-danger' })}
          </div>
          <button type="submit" className="btn btn-success">
            Enviar a Firestore
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
