import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ModificarCom = ({ proveedor , selectedProveedor}) => {
    
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
    IDproveedor: "",
    NomProveedor: "",
    ApellPaProv: "",
    ApellMaProv: "",
    Celular: "",
    Compañia: "",
    Folio: "",
    Fecha_Alta: "",
  });

  // Estado para manejar la respuesta del servidor
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (proveedor) {
      setFormData({
        IDproveedor: proveedor.IDproveedor,
        NomProveedor: proveedor.NomProveedor,
        ApellPaProv: proveedor.ApellPaProv,
        ApellMaProv: proveedor.ApellMaProv,
        Celular: proveedor.Celular,
        Compañia: proveedor.Compañia,
        Folio: proveedor.Folio,
        Fecha_Alta: proveedor.Fecha_Alta,
      });
    }
  }, [proveedor]); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/ModificarProveedor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        
        toast.success("Proveedor modificado correctamente");
      } else {
       
        toast.error("Error al modificar el proveedor");
      }
    } catch (error) {
      setResponseMessage("Error al conectar con el servidor.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h1 style={styles.formTitle}>Modificar Proveedor</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="IDproveedor" style={styles.formLabel}>
            ID Proveedor:
          </label>
          <input
            type="text"
            name="IDproveedor"
            id="IDproveedor"
            value={formData.IDproveedor}
            onChange={handleChange}
            required
            
            style={{
                ...styles.formInput,
                ...{ backgroundColor: "#f0f0f0f0" },
            }}
            readOnly
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="NomProveedor" style={styles.formLabel}>
            Nombre Proveedor:
          </label>
          <input
            type="text"
            name="NomProveedor"
            id="NomProveedor"
            value={formData.NomProveedor}
            onChange={handleChange}
            required
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="ApellPaProv" style={styles.formLabel}>
            Apellido Paterno:
          </label>
          <input
            type="text"
            name="ApellPaProv"
            id="ApellPaProv"
            value={formData.ApellPaProv}
            onChange={handleChange}
            required
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="ApellMaProv" style={styles.formLabel}>
            Apellido Materno:
          </label>
          <input
            type="text"
            name="ApellMaProv"
            id="ApellMaProv"
            value={formData.ApellMaProv}
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
          <label htmlFor="Compañia" style={styles.formLabel}>
            Compañía:
          </label>
          <input
            type="text"
            name="Compañia"
            id="Compañia"
            value={formData.Compañia}
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

        <div style={styles.formGroup}>
          <label htmlFor="Fecha_Alta" style={styles.formLabel}>
            Fecha de Alta:
          </label>
          <input
            type="date"
            name="Fecha_Alta"
            id="Fecha_Alta"
            value={formData.Fecha_Alta}
            onChange={handleChange}
            required
            style={styles.formInput}
          />
        </div>
            <Toaster position="top"/>
        <button onClick={() => handleSubmit()}
        type="submit" 
        style={selectedProveedor ? styles.formSubmitButton : styles.formSubmitButtonDisabled} 
        disabled={!selectedProveedor} // Deshabilita si no hay proveedor seleccionado
        >
        Modificar Proveedor
        </button>

      </form>

      {responseMessage && <p style={styles.responseMessage}>{responseMessage}</p>}
    </div>
  );
};

export default ModificarCom;
