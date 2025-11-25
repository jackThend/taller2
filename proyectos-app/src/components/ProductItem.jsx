import React from 'react';

const ProductItem = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="card h-100"> {/* Usar card y h-100 para altura uniforme */}
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">Precio: ${producto.precio}</p>
        <button
          className="btn btn-primary"
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
