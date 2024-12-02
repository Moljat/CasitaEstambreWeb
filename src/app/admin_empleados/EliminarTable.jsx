import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const EliminarTable = () => {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Función para cargar los empleados desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/consultaEmpleados');
        toast.success('Empleados cargados correctamente');
        
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
        toast.error('Error al cargar los empleados');
      }
    };
    
    fetchData();
  }, []);

  // Función para filtrar los empleados por nombre o apellido
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrar los empleados por nombre o apellido
  const filteredEmpleados = empleados.filter((emp) =>
    emp.NombreEmp.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.ApellEmp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para eliminar un empleado
  const handleEliminar = async (emp) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar al empleado ${emp.NombreEmp}?`);
    
    if (confirmDelete) {
      try {
        const response = await fetch('/api/eliminarEmpleado', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ IDempleado: emp.IDempleado }),
        });

        if (response.ok) {
          toast.success('Empleado eliminado correctamente');
          setEmpleados(empleados.filter(e => e.IDempleado !== emp.IDempleado));
        } else {
          toast.error('Error al eliminar el empleado');
        }
      } catch (error) {
        console.error('Error al eliminar el empleado:', error);
        toast.error('Error al eliminar el empleado');
      }
    }
  };

  return (
    <div>
      <div style={{ flex: "1", maxWidth: "45%" }}>
        <h3>Buscar Empleado</h3>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "6px 12px",
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
              <th style={{ padding: "10px" }}>Apellido</th>
              <th style={{ padding: "10px" }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredEmpleados.map((emp) => (
              <tr
                key={emp.IDempleado}
                style={{ borderBottom: "1px solid #ddd", backgroundColor: "#fff", transition: "background-color 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f8ff"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
              >
                <td style={{ padding: "10px" }}>{emp.IDempleado}</td>
                <td style={{ padding: "10px" }}>{emp.NombreEmp}</td>
                <td style={{ padding: "10px" }}>{emp.ApellEmp}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                    onClick={() => handleEliminar(emp)} // Eliminar directamente al hacer clic
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
