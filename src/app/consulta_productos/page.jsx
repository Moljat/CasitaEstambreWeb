// src/app/consulta_productos/page.jsx

"use client";

import React, { useEffect, useState } from 'react';




export default function ConsultaProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

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
    border: "1px solid #ddd",
    alignItems: "center",
  };

  if (error) return <p>{error}</p>;

  return (
        <div>
        <h1 
        style={
          { textAlign: "center" ,
           fontSize: "40px" ,
           color: "var(--geist-foreground)" }
        }>Lista de Productos</h1>
       
       
        {productos.length === 0 ? (
            <div 
            style={
              { display: "flex" ,
               justifyContent: "center" ,
               alignItems: "center" ,
              height: "200px" ,
               fontSize: "24px" ,
               color: "var(--geist-foreground)" ,
               backgroundColor: "var(--geist-background)" }
            }>Cargando productos...
              <button>
                <svg
                  className="animate-spin h-10 w-10 mr-3 text-blue-500"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeDasharray="60 20"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <table className="border-separate table-auto "
            style={
              { width: "50%" ,
               borderCollapse: "collapse",
               margin: "auto",
               paddingLeft: "15px",
                paddingRight: "15px"
              }
            }>
              <thead>
                <tr className='bg-gray-600'
                style={
                  { 
                    alignContent: "center" ,
                   color: "var(--geist-background)" }
                }>
                  <th style={celdaTabla}>Nombre</th>
                  <th style={celdaTabla}>Precio</th>
                  <th style={celdaTabla}>Existencias</th>
                  <th style={celdaTabla}>Descripción</th>
                  
                </tr>
              </thead>
              
              <tbody>
                {productos.map((producto) => (

                 
                  <tr key={producto.IDproductos}>
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
}
