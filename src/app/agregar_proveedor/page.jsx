"use client";

  import React, { useState } from 'react';
  import AltaForm from './AltaForm';
  import ModificarTable from './ModificarTable';
  import EliminarTable from './EliminarTable';
import Ayuda from './Ayuda';

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
      padding: "15px 30px", 
      fontSize: "1.2rem", 
      borderRadius: "8px", 
      margin: "10px", 
      color: "white",
      transition: "transform 0.3s ease, background-color 0.3s ease",
    }
  };
  
  const ProveedorForm = () => {
    const [action, setAction] = useState(null);
  
    const handleAction = (actionType) => {
      setAction(actionType);
    };
  
    return (

      <div>

        <div  style={styles.pageContainer}>
          <h1 className='pb-12 text-6xl text-cafe'
          style={{
            textAlign: "center",
        
          }}>Gestión de Proveedores</h1>
          
          <div style={styles.buttonContainer}>
            <button className="transition ease-in-out delay-300 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-600 duration-600 hover:shadow-inner  " onClick={() => handleAction('alta')} style={styles.button}>Alta</button>
            <button className="transition ease-in-out delay-300 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-purple-600 duration-600 hover:shadow-inner "   onClick={() => handleAction('modificacion')} style={styles.button}>Modificación</button>
            <button className=" transition ease-in-out delay-300 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-600 hover:shadow-inner " onClick={() => handleAction('eliminacion')} style={styles.button}>Eliminación</button>
          </div>
      
          {/* Renderización condicional */}
          {action === 'alta' && <AltaForm />}
          {action === 'modificacion' && <ModificarTable />}
          {action === 'eliminacion' && <EliminarTable />}
        </div>
        <Ayuda />
      </div>
      );

      
   
      
}
  

export default ProveedorForm;