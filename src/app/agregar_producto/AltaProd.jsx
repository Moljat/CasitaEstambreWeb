"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

const ProductForm = (selectedId) => {
    console.log("ID ", selectedId);

    const [formData, setFormData] = useState({
        IDproductos: "",
        Nombre_Producto: "",
        Existencias: "",
        Precio: "",
        Descripcion: "",
        ID_proveedor: "",
    });

    const [errors, setErrors] = useState({
      IDproductos: false, 
  });

    const styles = {
        container: {
          display: "block",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          minWidth: "400px",
          margin: "20px auto",
        },
        title: {
          fontSize: "2rem",
          marginBottom: "20px",
          color: "#333",
        },
        form: {
          width: "100%",
          display: "block",
          flexDirection: "column",
          gap: "15px",
        },
        formGroup: {
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        },
        label: {
          fontSize: "1rem",
          color: "#555",
          hover: "none",
        },
        input: {
          padding: "10px",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          outline: "none",
          transition: "border-color 0.3s",
        },
        inputError: {
          borderColor: "red", // Bordes rojos si hay un error
        },
        inputFocus: {
          borderColor: "#28a745",
        },
        
        buttonDisabled: {
          padding: "12px",
          backgroundColor: "#cccccc",
          color: "#666666",
          fontSize: "1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "not-allowed",
          transition: "background-color 0.3s",
        },
        responseMessage: {
          marginTop: "20px",
          fontSize: "1rem",
          color: "#28a745",
          wordWrap: "break-word", // Permite que las palabras largas se dividan
          wordBreak: "break-word", // Maneja el comportamiento de las palabras largas
          whiteSpace: "normal",
          
        },
      };

    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        // Si hay un selectedId, actualiza el campo de ID_proveedor
        if (selectedId) {
            setFormData((prevData) => ({
                ...prevData,
                ID_proveedor: selectedId.selectedId,
                
            }));
        }
       
    }, [selectedId]); // Se ejecuta cada vez que selectedId cambia

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const idProducto = formData.IDproductos;
        if (!/^\d+$/.test(idProducto)) {
            toast.error("El ID debe ser un número válido.");
            setErrors((prevErrors) => ({ ...prevErrors, IDproductos: true }));
            return; // Detiene el envío del formulario si no es un número válido
        }

        try {
            const response = await fetch("/api/RegistroProducto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setResponseMessage("Producto agregado exitosamente.");
                toast.success("Producto agregado exitosamente.");
            } else {
               
                toast.error(`Error: ${result.error}`);
            }
        } catch (error) {
            setResponseMessage("Error al conectar con el servidor.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex justify-center" style={styles.container}>
         
        <h1 style={styles.title}>Agregar Producto</h1>
        <h5 className="text-red-600 text-start text-"> * Todos los campos son obligatorios</h5>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>ID Producto:</label>
            <input
              type="text"
              placeholder="Inserta un número válido, evita repetirlos"
              name="IDproductos"
              value={formData.IDproductos}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                ...(errors.IDproductos && styles.inputError), 
            }}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre Producto:</label>
            <input
              type="text"
              name="Nombre_Producto"
              placeholder="Ejemplo: hilo, estambre, etc."
              value={formData.Nombre_Producto}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Existencias:</label>
            <input
              type="number"
              name="Existencias"
              placeholder="Cantidad de productos que hay"
              value={formData.Existencias}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Precio:</label>
            <input
              type="number"
              step="1.00"
              name="Precio"
             
              value={formData.Precio}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Descripción:</label>
            <input
              type="text"
              name="Descripcion"
              placeholder="Inserte las características del producto"
              value={formData.Descripcion}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div className="pb-8" style={styles.formGroup}>
            <label style={styles.label}>ID Proveedor:</label>
            <input
              type="text"
              name="ID_proveedor"
              placeholder="Selecciona un proveedor en la parte izquierda"
              value={formData.ID_proveedor || ""}   
              readOnly
              
              required
              style={styles.input}
            />
          </div>
          <button className="bg-blue-500 hover:bg-green-600  " type="submit" style={{
            padding: "12px",
            fontSize: "1rem",
            alignSelf: "center",
            border: "none",
            borderRadius: "4px",
          }}>
            Agregar Producto
          </button>
        </form>
        {responseMessage && <p style={styles.responseMessage}>{responseMessage}</p>}
      </div>
    );
};

export default ProductForm;
