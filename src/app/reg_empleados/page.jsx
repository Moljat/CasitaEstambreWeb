"use client";
//Esto de arriba me lo tienes que explicar porque no entendi porque se ponia jaja

import { Input } from 'postcss';
import React, { useState, useEffect } from 'react';

//no se si sea buena practica ponerle este nombre, pero creo que se ve bien jaja
const Reg_empleados = () => {
  const [hora, horaActualizar] = useState('');

//Es nota para mi 
//useEffect solo se ejecuta cuando se muestra en la pantalla
  useEffect(() => {
  //actualizar la hora cada 1000 milisegundos (1 segundo)
    const interval = setInterval(() => {
      const Fecha = new Date();
      horaActualizar(Fecha.toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //Alerta de que se pulso el boton
  const clikazo = () => {
    //Muestro con el alert
    //Creo que tu haces tu magia con la bd, no?
    if(folioEmpleado.value === ''){
    alert('El folio no puede ser nulo');
    }else
  alert('El folio '+folioEmpleado.value+' a la hora' + hora + ' ha sido registrado');


  };

  //Me perdi bien facil con los div, pero creo que  va bien
  return (
    <div style={{ marginTop: '40px', textAlign: 'center' }}>
      <h1 style={{ color: 'white' , fontSize: '30px'}}
            >Nombre del Empleado</h1>

        <div style={{ marginTop: '20px' }}>
            {/*Se supone que al dar click se pone aqui el nombre del empleado. aunque creo que seria mejor solamente mostrarlo en el alert
            del clikazo o no se*/}
            <h2 style={{color : 'white'}}>Hola de nuevo: </h2>
         </div>

      <div style={{ marginTop: '20px', color: 'white' }}>
        <h3>Fecha y Hora: {hora}</h3>
      </div>
        <div style={{ marginTop: '20px' }}>
                <input
                type="text"
                id="folioEmpleado"
                placeholder='Folio del Empleado'
                />
        </div>

            <button
                onClick={clikazo}
                style={{
                marginTop: '20px',
                fontSize: '16px',
                padding: '10px 20px',
                backgroundColor: '#dfb560',
                color: 'black',
                borderRadius: '15px', //amo los botones redondeados, sorry
                }}
            > Registro por Folio
            </button>
    </div>
  );
};

export default Reg_empleados;
