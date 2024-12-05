// src/app/consulta_productos/page.jsx
// src/app/consulta_productos/page.jsx

"use client";

import React, { useEffect, useState } from 'react';
import toast, {Toaster} from 'react-hot-toast';




export default function ConsultaProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState("");

  // Filtrar productos que contengan el término de búsqueda en el nombre
  const productosFiltrados = productos.filter((producto) =>
    producto.Nombre_Producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    // Hacer la petición al endpoint API de Next.js
    const fetchData = async () => {
      try {
        const response = await fetch('/api/consultaProductos');
        
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        toast.success('Productos cargados correctamente');
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        toast.error('Error al cargar los productos');
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
    <div>
      <Toaster position="top" reverseOrder={false} />
    <h1 className="text-cafe" style={{ textAlign: "center", fontSize: "40px"}}>
      Lista de Productos
    </h1>

    {/* Campo de búsqueda */}
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "50%",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
    </div>

    {productosFiltrados.length === 0 ? (
      <div 
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          fontSize: "24px",
          color: "var(--geist-foreground)",
          backgroundColor: "var(--geist-background)"
        }}
      >
        
      </div>
    ) : (
      <table className="border-separate table-auto"
        style={{
          width: "50%",
          borderCollapse: "collapse",
          margin: "auto",
          paddingLeft: "15px",
          paddingRight: "15px"
        }}
      >
        <thead>
          <tr className='bg-durazno' style={{ textAlign: "center", color: "var(--geist-background)" }}>
          <th style={celdaTabla}>ID</th>
            <th style={celdaTabla}>Nombre</th>
            <th style={celdaTabla}>Precio</th>
            <th style={celdaTabla}>Existencias</th>
            <th style={celdaTabla}>Descripción</th>
          </tr>
        </thead>

        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.IDproductos}>
              <td style={celdaTabla}>{producto.IDproductos}</td>
              <td style={celdaTabla}>{producto.Nombre_Producto}</td>
              <td style={celdaTabla}>${producto.Precio}</td>
              <td style={celdaTabla}>{producto.Existencias}</td>
              <td style={celdaTabla}>{producto.Descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
};
