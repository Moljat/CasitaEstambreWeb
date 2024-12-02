import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ModificarCom = ({ empleado, selectedEmpleado }) => {
    
  const styles = {
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      margin: "20px auto",
    },
    formTitle: {
      fontSize: "2rem",
      marginBottom: "20px",
      color: "#333",
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    formLabel: {
      fontSize: "1rem",
      color: "#555",
    },
    formInput: {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      outline: "none",
      transition: "border-color 0.3s",
    },
    formInputFocus: {
      borderColor: "#28a745",
    },
    
        formSubmitButton: {
          padding: "12px",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        },
        formSubmitButtonDisabled: {
          padding: "12px",
          backgroundColor: "#cccccc",  // Color gris para indicar que está deshabilitado
          color: "#666666",  // Texto gris para el estado deshabilitado
          fontSize: "1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "not-allowed",  // Cursor cambiado a "no permitido"
          transition: "background-color 0.3s",
        },
      
    responseMessage: {
      marginTop: "20px",
      fontSize: "1rem",
      color: "#28a745", // Verde para mensajes de éxito
    },
  };

  // Estado para manejar los cambios del formulario
  const [formData, setFormData] = useState({
    IDEmpleado: "",
    NombreEmp: "",
    ApellPaEmp: "",
    ApellMaEmp: "",
    Celular: "",
    Departamento: "",
    Fecha_Nac: "",
    Fecha_Alta: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

 
  

  useEffect(() => {
    if (empleado) {
      setFormData({
        IDempleado: empleado.IDempleado,
        NombreEmp: empleado.NombreEmp,
        ApellEmp: empleado.ApellEmp,
        Celular: empleado.Celular,
        Fecha_Nac: empleado.Fecha_Nac || "",
        Fecha_Alta: empleado.Fecha_Alta || "",
        Folio: empleado.Folio,
      });
    }
  }, [empleado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
   

    try {
      const response = await fetch("/api/ModificarEmpleado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Empleado modificado correctamente");
      } else {
        toast.error("Error al modificar el empleado");
      }
    } catch (error) {
      setResponseMessage("Error al conectar con el servidor.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h1 style={styles.formTitle}>Modificar Empleado</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="IDempleado" style={styles.formLabel}>
            ID Empleado:
          </label>
          <input
            type="text"
            name="IDempleado"
            id="IDempleado"
            value={formData.IDempleado}
            onChange={handleChange}
            required
            style={{
              ...styles.formInput,
              ...{ backgroundColor: "#f0f0f0" },
            }}
            readOnly
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="NombreEmp" style={styles.formLabel}>
            Nombre Empleado:
          </label>
          <input
            type="text"
            name="NombreEmp"
            id="NombreEmp"
            value={formData.NombreEmp}
            onChange={handleChange}
            required
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="ApellEmp" style={styles.formLabel}>
            Apellidos:
          </label>
          <input
            type="text"
            name="ApellEmp"
            id="ApellEmp"
            value={formData.ApellEmp}
            onChange={handleChange}
            required
            style={styles.formInput}
          />
        </div>

        

        <div style={styles.formGroup}>
          <label htmlFor="Celular" style={styles.formLabel}>
            Celular:
          </label>
          <input
            type="text"
            name="Celular"
            id="Celular"
            value={formData.Celular}
            onChange={handleChange}
            required
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="Fecha_Nac" style={styles.formLabel}>
            Fecha Nacimiento:
          </label>
          <input
            type="text"
            name="Fecha_Nac"
            id="Fecha_Nac"
            value={formData.Fecha_Nac}
            onChange={handleChange}
            required
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="Fecha_Alta" style={styles.formLabel}>
            Fecha de Alta:
          </label>
          <input
            type="text"
            name="Fecha_Alta"
            id="Fecha_Alta"
            value={formData.Fecha_Alta}
            onChange={handleChange}
            required
            style={styles.formInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="Folio" style={styles.formLabel}>
            Folio:
          </label>
          <input
            type="text"
            name="Folio"
            id="Folio"
            value={formData.Folio}
            onChange={handleChange}
            required
            style={styles.formInput}
          />
        </div>


        <Toaster position="top" />
        <button
          onClick={() => handleSubmit()}
          type="submit"
          style={selectedEmpleado ? styles.formSubmitButton : styles.formSubmitButtonDisabled}
          disabled={!selectedEmpleado} // Deshabilita si no hay empleado seleccionado
        >
          Modificar Empleado
        </button>
      </form>

      {responseMessage && <p style={styles.responseMessage}>{responseMessage}</p>}
    </div>
  );
};

export default ModificarCom;
