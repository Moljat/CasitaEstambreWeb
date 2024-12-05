// src/app/consulta_productos/page.jsx
// src/app/consulta_productos/page.jsx

"use client";

import React, { useEffect, useState } from 'react';




export default function ProdTable() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState("");

  // Filtrar productos que contengan el término de búsqueda en el nombre e ID
  const productosFiltrados = productos.filter((producto) => {
    const busquedaLower = busqueda.toLowerCase(); // Hacer minúsculas la búsqueda
    const nombreCoincide = producto.Nombre_Producto.toLowerCase().includes(busquedaLower);
    const idCoincide = producto.IDproductos.toString().includes(busquedaLower); 

    return nombreCoincide || idCoincide; 
});

  useEffect(() => {
    // Hacer la petición al endpoint API de Next.js
    const fetchData = async () => {
      try {
        const response = await fetch('/api/consultaProductos');
        
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setError('No se pudo obtener la lista de productos');
      }
    };

    fetchData();
  }, []);

  const celdaTabla = {
    padding: "15px",
    textAlign: "center",
    border: "1px solid black",
    alignItems: "center",
  };

  if (error) return <p>{error}</p>;

  return (
    <div style={{
      
    }}>
    <h1 style={{ textAlign: "center", fontSize: "40px", color: "var(--geist-foreground)" }}>
      Lista de Productos
    </h1>

    {/* Campo de búsqueda */}
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Buscar por nombre o ID..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid black"
        }}
      />
    </div>

        <div style={{
          maxHeight: '600px',
          overflowY: 'auto',
        }}>
    {productosFiltrados.length === 0 ? (
      <div 
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          fontSize: "24px",
          color: "var(--geist-foreground)",
          backgroundColor: "var(--geist-background)",
        
        }}
      >
        
      </div>
    ) : (
      <table className="border-separate table-auto"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "auto",
          border: "1px solid black"
        }}
      >
        <thead>
          <tr className='bg-durazno' style={{ textAlign: "center" }}>
            <th style={celdaTabla}>ID</th>
            <th style={celdaTabla}>Nombre</th>
            <th style={celdaTabla}>Descripción</th>
          </tr>
        </thead>

        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.IDproductos}>
              <td style={celdaTabla}>{producto.IDproductos}</td>
              <td style={celdaTabla}>{producto.Nombre_Producto}</td>
              <td style={celdaTabla}>{producto.Descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

        </div>
  </div>
);
};
