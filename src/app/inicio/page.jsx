"use client"; // Esto es necesario si estás usando Next.js con React 18+ para que el hook useEffect funcione en un componente cliente.

import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import LogoutButton from "../components/LogoutButton";

export default function Inicio() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hello");
        
        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();
        setProductos(data);
        
        // Mostrar notificación de éxito
        toast.success("Productos cargados correctamente");
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError("No se pudo obtener la lista de productos");
        
        // Mostrar notificación de error
        toast.error("Error al cargar los productos");
      }
    };

    fetchData();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h1>Lista de Productos</h1>
      <LogoutButton />
    </div>
  );
}