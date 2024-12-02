"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ConteoEfectivo() {
    const [ventas, setVentas] = useState([]);
    const [ventasFiltradas, setVentasFiltradas] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [efectivoTotal, setEfectivoTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/consultaVentas');
                toast.success('Ventas cargadas correctamente');
                
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                const data = await response.json();
                setVentas(data);
                setVentasFiltradas(data); // Inicialmente mostramos todas las ventas
            } catch (error) {
                console.error('Error al obtener las ventas:', error);
                toast.error('Error al cargar las ventas');
            }
        };

        fetchData();
    }, []);

    // Función para convertir el formato DD/MM/YYYY HH:mm:ss o DD/MM/YYYY a un objeto Date
    const convertirFecha = (fechaStr) => {
        const [fecha, hora] = fechaStr.includes(" ") ? fechaStr.split(' ') : [fechaStr, '00:00:00'];
        const [dia, mes, anio] = fecha.split('/');
        const [horaStr, minutosStr, segundosStr] = hora.split(':');

        // Devolvemos el objeto Date usando los valores extraídos
        return new Date(anio, mes - 1, dia, horaStr, minutosStr, segundosStr);
    };

    // Filtrar las ventas en base a las fechas seleccionadas
    useEffect(() => {
        if (fechaInicio && fechaFin) {
            const ventasFiltradas = ventas.filter((venta) => {
                const fechaVenta = convertirFecha(venta.fecha_venta);
                const fechaInicioObj = new Date(fechaInicio);
                const fechaFinObj = new Date(fechaFin);
                
                // Comparamos las fechas
                return fechaVenta >= fechaInicioObj && fechaVenta <= fechaFinObj;
            });
            setVentasFiltradas(ventasFiltradas);
        } else {
            setVentasFiltradas(ventas); // Si no hay fechas, mostramos todas las ventas
        }
    }, [fechaInicio, fechaFin, ventas]);

    // Calcular el efectivo total en base a las ventas filtradas
    useEffect(() => {
        const totalEfectivo = ventasFiltradas.reduce((acc, venta) => {
            return acc + parseFloat(venta.total); // Sumamos los totales de cada venta
        }, 0);
        setEfectivoTotal(totalEfectivo);
    }, [ventasFiltradas]);

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="fechaInicio" className="block font-semibold">Fecha Inicio</label>
                <input
                    type="date"
                    id="fechaInicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="fechaFin" className="block font-semibold">Fecha Fin</label>
                <input
                    type="date"
                    id="fechaFin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                />
            </div>

            <div style={{
                maxHeight: "800px",
                display: "flex",
                overflowY: "auto",
                maxWidth: "80%",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left"
                }}>
                    <thead>
                        <tr style={{
                            backgroundColor: "#f8f8f8",
                            borderBottom: "2px solid #ddd"
                        }}>
                            <th style={{ padding: "10px" }}>ID</th>
                            <th style={{ padding: "10px" }}>Fecha y Hora</th>
                            <th style={{ padding: "10px" }}>Subtotal</th>
                            <th style={{ padding: "10px" }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasFiltradas.map((venta) => (
                            <tr key={venta.IDventa} style={{
                                borderBottom: "1px solid #ddd",
                                backgroundColor: "#fff",
                                transition: "background-color 0.3s"
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f8ff"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}>
                                <td style={{ padding: "10px" }}>{venta.IDventa}</td>
                                <td style={{ padding: "10px" }}>{venta.fecha_venta}</td>
                                <td style={{ padding: "10px" }}>{venta.subtotal}</td>
                                <td style={{ padding: "10px" }}>{venta.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mostrar el total del efectivo */}
            <div className="mt-4">
                <h3 className="font-semibold">Efectivo Total: ${efectivoTotal.toFixed(2)}</h3>
            </div>
        </div>
    );
}
