"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';


const ProdTable = ( {setSelectedProducto}   ) => { 
  const [producto, setProducto] = useState([]);
  const [selectedProducto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/consultaProductos');
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setProducto(data);
        toast.success('Productos cargados correctamente');
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        toast.error('Error al cargar los productos');
      }
    };

    fetchData();
  }, []);

  const handleSelectProducto = async (prod) => {
    console.log('Producto seleccionado:', prod.IDproductos);
    try {
        const response = await fetch('/api/consultaProducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ IDproductos: prod.IDproductos }),
        });

        if (!response.ok) {
            throw new Error('Error al consultar el producto');
        }

        const result = await response.json();

        if (result.length === 0) {
            alert('Producto no encontrado');
            return;
        }

        console.log('Producto válido:', result[0]);
       // setSelectedProduct(result[0]); // Usar la función pasada como prop

    } catch (error) {
        console.error('Error:', error.message);
        alert('Error: ' + error.message);
    }
};
  return (
    <div>
      <div style={{
        maxWidth: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        
      }}>
        <div style={{
          flex: '1',
          borderRadius: '8px',
          padding: '20px',
        }}></div>

        <div style={{ flex: '1' }}>
            

          <h3 className=' text-4xl pl-10'>Productos en Venta</h3>
          <div style={{
            maxHeight: '600px',
            overflowY: 'auto',
            maxWidth: '600px',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
            }}>
              <thead>
                <tr style={{
                  backgroundColor: '#f8f8f8',
                  borderBottom: '2px solid #ddd',
                }}>
                  
                  <th style={{ padding: '10px' }}>Nombre</th>
                  <th style={{ padding: '10px' }}>Precio</th>
                  <th style={{ padding: '10px' }}></th>
                </tr>
              </thead>
              <tbody>
                {producto.map((prod) => (
                  <tr
                    key={prod.IDproductos}
                    style={{
                      borderBottom: '1px solid #ddd',
                      backgroundColor: '#fff',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8ff'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    
                    <td style={{ padding: '10px' }}>{prod.Nombre_Producto}</td>
                    <td style={{ padding: '10px' }}>{prod.Precio}</td>
                    <td style={{ padding: '10px' }}>
                      <button
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                        }}
                        onClick={() => setSelectedProducto(prod)}
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedProducto && (
            <div style={{ marginTop: '20px' }}>
              <h4>Proveedor Seleccionado: {selectedProducto.Nombre_Producto}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdTable;
