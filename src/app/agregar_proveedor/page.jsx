"use client";

import React, { useState } from "react";

const ProveedorForm = () => {
    const [formData, setFormData] = useState({
        IDproveedor: "",
        NomProveedor: "",
        ApellPaProv: "",
        ApellMaProv: "",
        Celular: "",
        Compañia: "",
        Folio: "",
        Fecha_Alta: "",
    });
    
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/AgregarProveedor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setResponseMessage("Proveedor agregado exitosamente.");
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
                    <label>ID Proveedor:</label>
                    <input
                        type="text"
                        name="IDproveedor"
                        value={formData.IDproveedor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nombre Proveedor:</label>
                    <input
                        type="text"
                        name="NomProveedor"
                        value={formData.NomProveedor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Apellido Paterno</label>
                    <input
                        type="text"
                        name="ApellPaProv"
                        value={formData.ApellPaProv}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Apellido Materno</label>
                    <input
                        type="text"
                        name="ApellMaProv"
                        value={formData.ApellMaProv}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div>
                    <label>Celular</label>
                    <input
                        type="text"
                        name="Celular"
                        value={formData.Celular}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Compañia</label>
                    <input
                        type="text"
                        name="Compañia"
                        value={formData.Compañia}
                        onChange={handleChange}
                        required
                    />
                </div>
               
                  
                <div>
                    <label>Folio</label>
                    <input
                        type="text"
                        name="Folio"
                        value={formData.Folio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de Alta</label>
                    <input
                        type="date"
                        name="Fecha_Alta"
                        value={formData.Fecha_Alta}
                        onChange={handleChange}
                        required
                    />
                </div>
                


                <button type="submit">Agregar Proveedor</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default ProveedorForm;
