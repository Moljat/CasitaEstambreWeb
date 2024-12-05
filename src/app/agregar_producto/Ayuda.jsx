import React from "react";
import { useState } from "react";

export default function Ayuda() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle la visibilidad de la respuesta
    };

    const preguntasFrecuentes = [
        {
            pregunta: "¿Cómo se realiza el registro de un producto?",
            respuesta: "Primero, Identifica de que proveedor es el producto, luego selecciona el proveedor y da clic en el botón de agregar producto," + 
            " llena los campos solicitados y da clic en el botón de guardar.",
        },
        {
            pregunta: "¿Qué pasa si los proveedores no se cargan correctamente?",
            respuesta: "Posiblemente haya un error en la conexión a la base de datos, por favor contacta a soporte para que puedan ayudarte.",
        },
        {
            pregunta: "¿Qué significa 'Duplicate entry  for key 'productos.PRIMARY' '?",
            respuesta: "Significa que ya existe un producto con el mismo ID, por favor verifica que el ID del producto sea único." +
            " Verifica en la tabla de productos si el producto ya existe. O un ID disponible.",
        },
        {
            pregunta: "¿Qué pasa si agrego un producto y no está registrado un proveedor / no sé el proveedor?",
            respuesta: "En la sección de proveedores, agrega un proveedor con datos en blanco, luego selecciona el proveedor y da clic en el botón de agregar producto," +
            " más tarde puedes editar el proveedor con los datos correctos.",
        },
    ];

    return (
        <footer className="bg-white shadow-lg"    style={{  padding: '5px' }}>
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                <h3 className="text-4xl pt-20" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Preguntas Frecuentes
                </h3>

                {preguntasFrecuentes.map((item, index) => (
                    <div key={index}>
                        <div className="shadow-lg text-purple-600 hover:bg-purple-600 hover:text-white pb-20"
                            onClick={() => handleToggle(index)}
                            style={{
                                
                                
                                padding: '10px',
                                marginBottom: '10px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                            }}
                        >
                            <h4 style={{ margin: 0 }}>{item.pregunta}</h4>
                        </div>

                        {activeIndex === index && (
                            <div
                                style={{
                                    backgroundColor: '#f1f1f1',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    marginBottom: '20px',
                                }}
                            >
                                <p style={{ margin: 0 }}>{item.respuesta}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </footer>
    );

}