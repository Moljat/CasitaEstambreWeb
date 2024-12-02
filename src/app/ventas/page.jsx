"use client";


import React, { useState, useEffect } from 'react';
import ProdTable from './ProdTable';
import DetalleVentaTable from './DetalleVentaTable';
import AltaVenta from './AltaVenta';

export default function VentasPage() {
    const [selectedProductos, setSelectedProductos] = useState([]); // Lista de productos seleccionados
    const [subtotal, setSubtotal] = useState(0);

    // Función para agregar productos a la lista de productos seleccionados
    const handleAddProducto = (producto) => {
        setSelectedProductos((prev) => [...prev, producto]);
    };

    // Función para eliminar un producto de la lista
    const handleEliminarProducto = (idProducto) => {
        setSelectedProductos((prev) => prev.filter((prod) => prod.IDproductos !== idProducto));
    };

    // Función para calcular el subtotal
    const calculateSubtotal = (productos) => {
        return productos.reduce((acc, prod) => acc + parseFloat(prod.Precio) * prod.Existencias, 0);
    };

    // UseEffect para recalcular el subtotal cuando cambian los productos seleccionados
    useEffect(() => {
        const subtotal = calculateSubtotal(selectedProductos);
        setSubtotal(subtotal); // Actualizar el subtotal
    }, [selectedProductos]);

    return (
        <div className="flex-grow">
            <h1 className="text-4xl mb-4 text-center">Ventas</h1>

            <div className="flex gap-4">
                {/* Tabla de Productos */}
                <div className="flex-1">
                    <ProdTable setSelectedProducto={handleAddProducto} />
                </div>

                {/* Detalle de Ventas */}
                <div className="flex-1">
                    <DetalleVentaTable 
                        productos={selectedProductos} 
                        onEliminarProducto={handleEliminarProducto} 
                    />
                </div>

                {/* Alta Venta */}
                <div className="flex-1">
                    <AltaVenta productosSeleccionados={selectedProductos} />
                </div>
            </div>
        </div>
    );
}
