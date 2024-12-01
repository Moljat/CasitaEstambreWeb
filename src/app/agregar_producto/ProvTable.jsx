import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ProvTable = ({ setSelectedId }) => { 
  const [proveedor, setProveedor] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer una consulta a la base de datos para obtener los proveedores
    const fetchData = async () => {
      try {
        const response = await fetch('/api/consultaProveedor');
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setProveedor(data);
        toast.success('Proveedor cargado correctamente');
      } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        toast.error('Error al cargar los proveedores');
      }
    };

    fetchData();
  }, []);

  const handleSelectProveedor = async (prov) => {
    console.log('Proveedor seleccionado:', prov.IDproveedor);
    try {
      const response = await fetch('/api/consultaProveedor1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IDproveedor: prov.IDproveedor }),
      });

      if (!response.ok) {
        throw new Error('Error al consultar el proveedor');
      }

      const result = await response.json();

      if (result.length === 0) {
        alert('Proveedor no encontrado');
        return;
      }

      setSelectedId(result[0].IDproveedor); // Aquí usamos setSelectedId
      console.log('Proveedor válido:', result[0].IDproveedor);

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
        gap: '20px',
        padding: '20px',
      }}>
        <div style={{
          flex: '1',
          borderRadius: '8px',
          padding: '20px',
        }}></div>

        <div style={{ flex: '1' }}>
          <h3>Selecciona un Producto para Modificar</h3>
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
                  <th style={{ padding: '10px' }}>ID</th>
                  <th style={{ padding: '10px' }}>Nombre</th>
                  <th style={{ padding: '10px' }}>Compañía</th>
                  <th style={{ padding: '10px' }}></th>
                </tr>
              </thead>
              <tbody>
                {proveedor.map((prov) => (
                  <tr
                    key={prov.IDproveedor}
                    style={{
                      borderBottom: '1px solid #ddd',
                      backgroundColor: '#fff',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8ff'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    <td style={{ padding: '10px' }}>{prov.IDproveedor}</td>
                    <td style={{ padding: '10px' }}>{prov.NomProveedor}</td>
                    <td style={{ padding: '10px' }}>{prov.Compañia}</td>
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

          {selectedProveedor && (
            <div style={{ marginTop: '20px' }}>
              <h4>Proveedor Seleccionado: {selectedProveedor.NomProveedor}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProvTable;
