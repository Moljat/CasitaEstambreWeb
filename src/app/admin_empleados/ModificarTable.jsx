import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import ModificarCom from './ModificarCom';

const ModificarTable = () => {
  const [empleado, setEmpleado] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);

  useEffect(() => {
    // Aquí podrías hacer una consulta a la base de datos para obtener los empleados
    const fetchData = async () => {
      try {
        const response = await fetch('/api/consultaEmpleados');
        toast.success('Empleados cargados correctamente');

        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setEmpleado(data);
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
        toast.error('Error al cargar los empleados');
      }
    };

    fetchData();
  }, []);

  const handleSelectEmpleado = async (empleado) => {
    console.log('Empleado:', empleado.IDempleado);
    try {
      const response = await fetch("/api/consultaEmpleado1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ IDempleado: empleado.IDempleado }),
      });

      if (!response.ok) {
        throw new Error("Error al consultar el empleado");
      }

      const result = await response.json();

      if (result.length === 0) {
        alert("Empleado no encontrado");
        return;
      }

      setSelectedEmpleado(result[0]); // Actualiza el estado con los datos del empleado
      console.log('Empleado Seleccionado:', result[0]);

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
        {/* Formulario de Modificación de Empleado */}
        <div style={{
          flex: "1", // Toma el espacio disponible
          maxWidth: "45%", // Limita el ancho del formulario
          borderRadius: "8px",
          padding: "20px",
        }}>
          {<ModificarCom empleado={selectedEmpleado} selectedEmpleado={!!selectedEmpleado} />}
        </div>

        {/* Tabla de Empleados */}
        <div style={{
          flex: "1",
          maxWidth: "45%",
        }}>
          <h3>Selecciona un Empleado para Modificar</h3>
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
                  <th style={{ padding: "10px" }}>Apellido</th>
                  <th style={{ padding: "10px" }}>Compañía</th>
                  <th style={{ padding: "10px" }}></th>
                </tr>
              </thead>
              <tbody>
                {empleado.map((emp) => (
                  <tr key={emp.IDempleado} style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "#fff",
                    transition: "background-color 0.3s"
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f8ff"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}>
                    <td style={{ padding: "10px" }}>{emp.IDempleado}</td>
                    <td style={{ padding: "10px" }}>{emp.NombreEmp}</td>
                    <td style={{ padding: "10px" }}>{emp.ApellEmp}</td>
                    <td style={{ padding: "10px" }}>{emp.Compañia}</td>
                    <td style={{ padding: "10px" }}>
                      <button
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px"
                        }}
                        onClick={() => handleSelectEmpleado(emp)}
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedEmpleado && (
            <div style={{ marginTop: "20px" }}>
              <h4>Empleado Seleccionado: {selectedEmpleado.NombreEmp}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModificarTable;
