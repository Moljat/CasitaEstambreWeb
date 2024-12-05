"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AltaVenta({ productosSeleccionados }) {
    const [cliente, setCliente] = useState('');
    const [descuento, setDescuento] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalPagado, setTotalPagado] = useState(0);
    const [cambio, setCambio] = useState(0);

    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const aplicarDescuento = (nuevoDescuento) => {
        const descuentoAplicado = nuevoDescuento || descuento; 
        const totalConDescuento = subtotal - (subtotal * (descuentoAplicado / 100));
        console.log('Subtotal:', subtotal);
        
        console.log('Total con descuento:', totalConDescuento);
        if(nuevoDescuento <= 0){
            setTotal(subtotal);
        }else {

            setTotal(totalConDescuento);
        }
    };
    

    // Actualizar la fecha y hora cada vez que se cargue el componente
    useEffect(() => {
        const obtenerFechaHora = () => {
            const now = new Date();
            const dia = String(now.getDate()).padStart(2, '0');
            const mes = String(now.getMonth() + 1).padStart(2, '0');
            const año = now.getFullYear();
            setFecha(`${dia}/${mes}/${año}`);  // Formato dd/mm/yyyy
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            setHora(now.toLocaleTimeString(undefined, timeOptions));
        };

        obtenerFechaHora();
        const intervalId = setInterval(obtenerFechaHora, 1000);  // Actualiza la hora cada segundo
        return () => clearInterval(intervalId);
    }, []);

    // Función para calcular el total y cambio cuando se ingresa el total pagado
    useEffect(() => {
        // Verifica que productosSeleccionados sea un arreglo antes de intentar usar reduce
        if (Array.isArray(productosSeleccionados)) {
            const total = productosSeleccionados.reduce((acc, prod) => {
                return acc + parseFloat(prod.Precio) || 0; // Asegurarse de que el valor sea numérico
            }, 0);
            setSubtotal(total); 
            
           
        }
        
    }
        
    , [productosSeleccionados]);

    // Calcular cambio automáticamente cuando se actualiza el totalPagado
    useEffect(() => {
        if (totalPagado >= total) {
            setCambio(totalPagado - total);
        } else {
            setCambio(0);
        }
    }, [totalPagado, total]);

    const handleAplicarVenta = () => {
        // Lógica para aplicar la venta, por ejemplo, enviarla a la base de datos o realizar otras acciones
        console.log('Venta aplicada');
        toast.success('Venta aplicada correctamente');
    };

    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-4">Punto de Venta</h1>
            <Toaster />
            {/* Fecha y Hora */}
            <div className="flex justify-between text-lg mb-4">
                <span>Fecha: {fecha}</span>
                <span>Hora: {hora}</span>
            </div>

            {/* Nombre del Cliente */}
            <div className="mb-4">
                <label htmlFor="cliente" className="block font-semibold">Nombre del Cliente</label>
                <input
                    id="cliente"
                    type="text"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Ingrese el nombre del cliente"
                />
            </div>

            {/* Subtotal */}
            <div className="mb-4">
                <label htmlFor="subtotal" className="block font-semibold">Subtotal</label>
                <input
                    id="subtotal"
                    type="number"
                    value={subtotal}
                    readOnly
                    onChange={(e) => setSubtotal(Number(e.target.value))}
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Ingrese el subtotal"
                />
            </div>

                        {/* Descuento */}
                        <div className="mb-4">
                <label htmlFor="descuento" className="block font-semibold">Descuento</label>
                <select
                    id="descuento"
                    value={descuento}
                    onChange={(e) => {
                        const descuentoValue = Number(e.target.value);
                        setDescuento(descuentoValue); 
                        aplicarDescuento(descuentoValue); 
                    }}
                    className="w-full p-2 border rounded mt-2"
                >
                    {/* Opciones del menú desplegable */}
                    <option value="" disabled>Seleccione un descuento</option>
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                </select>
            </div>

            {/* Total */}
            <div className="mb-4">
                <label htmlFor="total" className="block font-semibold">Total</label>
                <input
                    id="total"
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(Number(e.target.value))}
                    readOnly
                    className="w-full p-2 border rounded mt-2 bg-gray-200"
                    placeholder="El total se calcula automáticamente"
                />
            </div>

            {/* Total Pagado */}
            <div className="mb-4">
                <label htmlFor="totalPagado" className="block font-semibold">Total Pagado</label>
                <input
                    id="totalPagado"
                    type="text"
                    value={totalPagado}
                    onChange={(e) => setTotalPagado(Number(e.target.value))}
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Ingrese el total pagado"
                />
            </div>

            {/* Cambio */}
            <div className="mb-4">
                <label htmlFor="cambio" className="block font-semibold">Cambio</label>
                <input
                    id="cambio"
                    type="number"
                    value={cambio}
                    readOnly
                    className="w-full p-2 border rounded mt-2 bg-gray-200"
                    placeholder="El cambio se calcula automáticamente"
                />
            </div>

            {/* Botón para aplicar la venta */}
            <div className="text-center mt-6">
                <button
                    onClick={handleAplicarVenta}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Aplicar Venta
                </button>
            </div>
        </div>
    );
}
