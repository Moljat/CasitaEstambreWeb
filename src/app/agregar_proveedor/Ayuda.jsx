import React from "react";
import { useState } from "react";

export default function Ayuda() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle la visibilidad de la respuesta
    };

    const preguntasFrecuentes = [
        {
            pregunta: "¿Cómo Modifico un Proveedor?",
            respuesta: "Debes seleccionar en la otra tabla algún proveedor," + 
            " Al hacerlo se llenarán los campos con la información del proveedor seleccionado, luego puedes modificar los campos y dar clic en el botón de guardar.",
        },
        {
            pregunta: "¿Qué pasa si el proveedor no es una persona?",
            respuesta: "En ese caso, haz caso omiso de los campos de nombre y apellido, en su lugar solo pon '-' y llena los demás campos.",
        },
        {
            pregunta: "¿Qué significa 'Duplicate entry  for key 'proveedores.PRIMARY' '?",
            respuesta: "Significa que ya existe un producto con el mismo ID, por favor verifica que el ID del proveedor sea único.",
        },
        {
            pregunta: "¿Qué pasa si pongo los datos correctamente y no se guardan los datos?",
            respuesta: "En ese caso, hay problemas con la base de datos, contacta con soporte técnico para resolver el problema",
        },
    ];

    return (
        <footer className="bg-transparent"   >
            <div className="pt-96 ">
                
                <div className="bg-white">
                <h3 className="text-4xl pt-16" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Preguntas Frecuentes
                </h3>
                {preguntasFrecuentes.map((item, index) => (
                    <div key={index}>
                        <div className="shadow-lg transition ease-in-out delay-50 bg-white hover:-translate-y-1 hover:scale-102 hover:bg-purple-600 hover:text-white duration-600 hover:shadow-inner "
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
                                <p className="pb-4" style={{ margin: 0 }}>{item.respuesta}</p>
                            </div>
                        )}
                    </div>
                ))}

                </div>
            </div>
        </footer>
    );

}