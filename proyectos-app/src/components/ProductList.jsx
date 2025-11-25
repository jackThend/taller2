import React from 'react';
import ProductItem from './ProductItem';

// Datos simulados de productos
const productos = [
  { id: 1, nombre: 'Componente CPU', precio: 200 },
  { id: 2, nombre: 'Componente RAM', precio: 80 },
  { id: 3, nombre: 'Componente GPU', precio: 500 },
];

const ProductList = ({ agregarAlCarrito }) => {
  return (
    <div>
      <h2 className="mb-4">Productos Disponibles</h2>
      <div className="row g-4"> {/* Usar row y g-4 para una cuadrícula con gap */}
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-4"> {/* Cada item en una columna */}
            <ProductItem
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
