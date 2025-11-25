import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProductList from "./components/ProductList";
import ContactForm from "./components/ContactForm";
import Auth from "./components/Auth";
import StorageUploader from "./components/StorageUploader";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true); // Para saber si estamos comprobando el estado de auth

  useEffect(() => {
    // Este observador se ejecuta cuando el estado de autenticación cambia
    const unsubscribe = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
      setCargandoAuth(false); // Dejamos de cargar una vez que tenemos el estado
    });
    // Limpiar el observador al desmontar el componente
    return () => unsubscribe();
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  if (cargandoAuth) {
    return <div className="container mt-4 text-center"><h2>Cargando...</h2></div>;
  }

  return (
    <div className="container mt-4">
      <header className="text-center mb-4">
        <h1 className="display-4">Nuestra Tienda</h1>
        <p className="lead">Bienvenido a la tienda de componentes de React.</p>
      </header>
      <main className="row">
        <div className="col-lg-8">
          <ProductList agregarAlCarrito={agregarAlCarrito} />
          <hr/>
          <ContactForm />
        </div>
        <aside className="col-lg-4">
          <Auth usuario={usuario} />
          <hr/>
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Carrito de Compras</h2>
              {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
              ) : (
                <ul className="list-group">
                  {carrito.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {item.nombre}
                      <span className="badge bg-primary rounded-pill">${item.precio}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <hr/>
          {usuario ? (
            <StorageUploader usuario={usuario} />
          ) : (
            <div className="card p-3 text-center">
              <p className="mb-0">Debes iniciar sesión para poder subir archivos.</p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
