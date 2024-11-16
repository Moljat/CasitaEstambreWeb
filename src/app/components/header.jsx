
import React from "react";
import Image from 'next/image'
import Link from 'next/link';


export default function Header() {

    return (
        <header 
        className="bg-cover   bg-no-repeat  text-black py-20  hover:shadow-indigo-500/40" 
        style={{ backgroundImage: "url('headerCasita.jpeg')" }}
        >

      
      <div className="flex justify-between items-center px-6">
       
        <div className="flex items-center ">
            
            <Image
            src="/shesh.png"
            
            width={150}
            height={150}
            alt="Picture of the author"
            style={ {
                paddingRight: "30px",
                
            }} />
          
          <h1 className="text-3xl font-bold" style={[
            { fontFamily: "var(--font-geist-sans)" },
            { fontFamily: "var(--font -geist-mono)" }
            
            
          ]} >Casita de estambre</h1>
        </div>

        <nav>
          <ul className="flex justify-around space-x-16 cursor-pointer ">
            <li className=" hover:shadow-neutral-950 "> <Link href="/inicio" > Inicio</Link> </li>
            <li> <Link href="/consulta_productos" > Consulta de productos</Link> </li>
            <li> <Link href="/agregar_producto" > Agregar Productos</Link> </li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
            
          </ul>
        </nav>
      </div>
    </header>
    );
  }
