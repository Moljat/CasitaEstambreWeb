"use client";

import React, { useState } from "react";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        IDproductos: "",
        Nombre_Producto: "",
        Existencias: "",
        Precio: "",
        Descripcion: "",
        ID_proveedor: "",
    });

    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            } else {
                setResponseMessage(`Error: ${result.error}`);
            }
        } catch (error) {
            setResponseMessage("Error al conectar con el servidor.");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>Agregar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID Producto:</label>
                    <input
                        type="text"
                        name="IDproductos"
                        value={formData.IDproductos}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nombre Producto:</label>
                    <input
                        type="text"
                        name="Nombre_Producto"
                        value={formData.Nombre_Producto}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Existencias:</label>
                    <input
                        type="number"
                        name="Existencias"
                        value={formData.Existencias}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="Precio"
                        value={formData.Precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="Descripcion"
                        value={formData.Descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>ID Proveedor:</label>
                    <input
                        type="text"
                        name="ID_proveedor"
                        value={formData.ID_proveedor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Agregar Producto</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default ProductForm;
