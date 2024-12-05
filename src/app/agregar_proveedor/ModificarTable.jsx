import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import ModificarCom from './ModificarCom';

const ModificarTable = () => {
  const [proveedor, setProveedor] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  useEffect(() => {
    // Aquí podrías hacer una consulta a la base de datos para obtener los productos
    const fetchData = async () => {
        try {
          const response = await fetch('/api/consultaProveedor');
          toast.success('Proveedor cargado correctamente');
          
          if (!response.ok) throw new Error('Error en la respuesta del servidor');
          const data = await response.json();
          setProveedor(data);
        } catch (error) {
          console.error('Error al obtener los productos:', error);
          setError('No se pudo obtener la lista de productos');
          toast.error('Error al cargar los proveedores');
        }
      };
  
      fetchData();
  }, []);


  

  const handleSelectProveedor = async (proveedor) => {
    console.log('Proveedor:', proveedor.IDproveedor); 
    try {
        const response = await fetch("/api/consultaProveedor1", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({ IDproveedor: proveedor.IDproveedor }), 
        });
  
        if (!response.ok) {
          throw new Error("Error al consultar el proveedor");
        }
  
        const result = await response.json();
  
        if (result.length === 0) {
          alert("Proveedor no encontrado");
          return;
        }
  
        setSelectedProveedor(result[0]); // Actualiza el estado con los datos del proveedor
        console.log('Proveedor Seleccionado:', result[0]);
  
      } catch (error) {
        console.error("Error:", error.message);
        alert("Error: " + error.message);
      }
    };
  


  return (
    <div>
  
      {/* Contenedor principal con flexbox */}
      <div style={{
        display: "flex",
        justifyContent: "space-between", // Espacio entre elementos
        alignItems: "flex-start", // Alinea elementos en la parte superior
        gap: "20px", // Espaciado entre los elementos
        padding: "20px",
      }}>
        {/* Formulario de Alta */}
        <div style={{
          flex: "1", // Toma el espacio disponible
          maxWidth: "45%", // Limita el ancho del formulario
          borderRadius: "8px",
          padding: "20px",
        }}>
          {<ModificarCom proveedor={selectedProveedor} selectedProveedor={!!selectedProveedor} />}

        </div>
  
      
        <div style={{
          flex: "1", 
          maxWidth: "45%", 
        }}>
          <h3 className='text-center text-4xl pb-8'>Selecciona un Proveedor para Modificar</h3>
          <div style={{
            maxHeight: "800px", 
            overflowY: "auto",  
           
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
                  <th style={{ padding: "10px" }}>Nombre</th>
                  <th style={{ padding: "10px" }}>Compañía</th>
                  <th style={{ padding: "10px" }}></th>
                </tr>
              </thead>
              <tbody>
                {proveedor.map((prov) => (
                  <tr key={prov.IDproveedor} style={{
                    borderBottom: "1px solid #ddd", 
                    backgroundColor: "#fff", 
                    transition: "background-color 0.3s" 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#7c3aed"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}>
                    <td style={{ padding: "10px" }}>{prov.IDproveedor}</td>
                    <td style={{ padding: "10px" }}>{prov.NomProveedor}</td>
                    <td style={{ padding: "10px" }}>{prov.Compañia}</td>
                    <td style={{ padding: "10px" }}>
                      <button className='bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded'
                        style={{
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px"
                        }}
                        onClick={() => handleSelectProveedor(prov)}
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  );

  
  
}  



export default ModificarTable;
