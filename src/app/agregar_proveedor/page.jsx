"use client";

  import React, { useState } from 'react';
  import AltaForm from './AltaForm';
  import ModificarTable from './ModificarTable';
  import EliminarTable from './EliminarTable';

  const styles = {
    pageContainer: {
      
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center", 
      alignItems: "center", 
      gap: "10px",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    }
  };
  
  const ProveedorForm = () => {
    const [action, setAction] = useState(null);
  
    const handleAction = (actionType) => {
      setAction(actionType);
    };
  
    return (
        <div style={styles.pageContainer}>
          <h1 className='pb-12'
          style={{
            textAlign: "center",
            fontSize: "40px",
            color: "var(--geist-foreground)"
          }}>Gestión de Proveedores</h1>
          
          <div style={styles.buttonContainer}>
            <button className="transition duration-0 hover:duration-150" onClick={() => handleAction('alta')} style={styles.button}>Alta</button>
            <button onClick={() => handleAction('modificacion')} style={styles.button}>Modificación</button>
            <button onClick={() => handleAction('eliminacion')} style={styles.button}>Eliminación</button>
          </div>
      
          {/* Renderización condicional */}
          {action === 'alta' && <AltaForm />}
          {action === 'modificacion' && <ModificarTable />}
          {action === 'eliminacion' && <EliminarTable />}
        </div>
      );

      
   
      
}
  

export default ProveedorForm;