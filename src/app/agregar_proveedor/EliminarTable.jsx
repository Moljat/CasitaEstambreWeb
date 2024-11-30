import React, { useState, useEffect } from 'react';

const EliminarTable = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    // Aquí podrías hacer una consulta a la base de datos para obtener los productos
    setProductos([
      { id: 1, nombre: 'Producto 1' },
      { id: 2, nombre: 'Producto 2' }
    ]);
  }, []);

  const handleSelectProducto = (producto) => {
    setSelectedProducto(producto);
  };

  const handleEliminar = () => {
    // Aquí va la lógica para eliminar el producto seleccionado
    console.log('Eliminar Producto:', selectedProducto);
  };

  return (
    <div>
      <h2>Selecciona un Producto para Eliminar</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>
                <button onClick={() => handleSelectProducto(producto)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProducto && (
        <div>
          <h3>Producto Seleccionado: {selectedProducto.nombre}</h3>
          <button onClick={handleEliminar}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default EliminarTable;
