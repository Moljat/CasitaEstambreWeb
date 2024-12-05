"use client";

import React from "react";
import { useEffect } from "react";

export default function DetalleVentaTable({ productos, onEliminarProducto, setSubtotal }) {
    let uniqueID = 0;
    
    return (
        <div className="pt-12">
            <h2>Detalle de Venta</h2>
            <div style={{
             maxHeight: '600px',
             overflowY: 'auto',
             maxWidth: '600px',
             borderRadius: '8px',
        }}>
            <table
                style={{
                    
                    borderCollapse: "collapse",
                    textAlign: "left",
                    marginTop: "20px",
                    width: "100%",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <thead
                    style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                    }}
                >
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Nombre</th>
                        
                        <th style={thStyle}>Precio</th>
                        
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr
                            key={prod.ID_producto}
                            style={{
                                borderBottom: "1px solid #ddd",
                                backgroundColor: "#fff",
                                transition: "background-color 0.3s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                        >
                            <td style={tdStyle}>{uniqueID}</td>
                            <td style={tdStyle}>{prod.Nombre_Producto}</td>
                            <td style={tdStyle}>{prod.Precio}</td>    
                            <td style={tdStyle}>
                                <button
                                    onClick={() => onEliminarProducto(prod.ID_producto)}
                                    style={{
                                        padding: "6px 12px",
                                        backgroundColor: "#dc3545",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                    }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </div>
        </div>
    );
}

const thStyle = {
    padding: "10px",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "14px",
};

const tdStyle = {
    padding: "10px",
};
