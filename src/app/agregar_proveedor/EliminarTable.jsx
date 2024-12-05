import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const EliminarTable = () => {
  const [proveedor, setProveedor] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Función para cargar los proveedores desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/consultaProveedor');
        toast.success('Proveedor cargado correctamente');
        
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setProveedor(data);
      } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        toast.error('Error al cargar los proveedores');
      }
    };
    
    fetchData();
  }, []);

  // Función para filtrar los proveedores por nombre y compañía
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrar los proveedores por nombre y compañía
  const filteredProveedores = proveedor.filter((prov) =>
    prov.NomProveedor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prov.Compañia.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para eliminar un proveedor
  const handleEliminar = async (prov) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar al proveedor ${prov.NomProveedor}?`);
    
    if (confirmDelete) {
      try {
        const response = await fetch('/api/eliminarProveedor', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ IDproveedor: prov.IDproveedor }),
        });

        if (response.ok) {
          toast.success('Proveedor eliminado correctamente');
          setProveedor(proveedor.filter(p => p.IDproveedor !== prov.IDproveedor));
        } else {
          toast.error('Error al eliminar el proveedor');
        }
      } catch (error) {
        console.error('Error al eliminar el proveedor:', error);
        toast.error('Error al eliminar el proveedor');
      }
    }
  };

  return (
    <div>
      <div className='align-center' style={{ flex: "1", maxWidth: "100%" }}>
        <h3 className='text-center text-4xl pb-8'>Eliminar Proveedor</h3>
        <h4 className=' text-2xl pb-2'>Buscar Proveedor...</h4>
        <input
          type="text"
          placeholder="Buscar por nombre o compañía"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "12px 12px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "20px",

          }}
        />
      </div>

      <div style={{ maxHeight: "800px", overflowY: "auto", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f8f8", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "10px" }}>ID</th>
              <th style={{ padding: "10px" }}>Nombre</th>
              <th style={{ padding: "10px" }}>Compañía</th>
              <th style={{ padding: "10px" }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredProveedores.map((prov) => (
              <tr
                key={prov.IDproveedor}
                style={{ borderBottom: "1px solid #ddd", backgroundColor: "#fff", transition: "background-color 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#7c3aed"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
              >
                <td style={{ padding: "10px" }}>{prov.IDproveedor}</td>
                <td style={{ padding: "10px" }}>{prov.NomProveedor}</td>
                <td style={{ padding: "10px" }}>{prov.Compañia}</td>
                <td style={{ padding: "10px" }}>
                  <button className='shadow-lg transition ease-in-out delay-50 bg-red-600 hover:-translate-y-1 hover:scale-102 hover:bg-red-700 hover:text-white duration-600 hover:shadow-inner'
                    style={{
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                    onClick={() => handleEliminar(prov)} // Eliminar directamente al hacer clic
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
};

export default EliminarTable;
