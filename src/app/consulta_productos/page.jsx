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
        console.log(response);
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

  if (error) return <p>{error}</p>;

  return (
        <div>
        <h1>Lista de Productos</h1>
        {/* Check if there was an error or if loading */}
        {productos.length === 0 ? (
            <p>Cargando productos...</p>
        ) : (
            <ul>
            {productos.map((producto) => (
                // Ensure producto.id exists and is unique
                <li key={producto.id || producto.nombre}> 
                {producto.nombre} - ${producto.precio}
                </li>
            ))}
            </ul>
        )}
        </div>

  
  );
}
