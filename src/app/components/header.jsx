
import React from "react";
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';


export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);  // Controla el estado del menú desplegable

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);  // Alterna la visibilidad del menú
  };

    return (
      <header
      className="bg-cover bg-no-repeat text-black py-20 hover:shadow-indigo-500/40"
      style={{ backgroundImage: "url('headerCasita.jpeg')" }}
    >
      <div className="flex justify-between items-center px-6">
        <div className="flex items-center">
          <Image
            src="/shesh.png"
            width={150}
            height={150}
            alt="Picture of the author"
            style={{
              paddingRight: "30px",
            }}
          />
          <h1
            className="text-3xl font-bold"
            style={{
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Casita de estambre
          </h1>
        </div>

        {/* Menú normal en pantallas grandes */}
        <nav className="hidden lg:flex">
          <ul className="flex justify-around space-x-16 cursor-pointer">
            <li className="hover:shadow-neutral-950">
              <Link href="/inicio">Inicio</Link>
            </li>
            <li>
              <Link href="/consulta_productos">Consulta de productos</Link>
            </li>
            <li>
              <Link href="/agregar_producto">Agregar Productos</Link>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        
        <div className="lg:hidden flex items-center" onClick={toggleMenu}
        style={ {
          width: "50px",
        }}>
           <Bars3Icon className="h-6 w-6 text-black" />
        </div>
      </div>

      
      {menuVisible && (
        <nav className="lg:hidden  text-white "
        style={{
          textAlign: "Right",
        }}>
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link href="/inicio">Inicio</Link>
            </li>
            <li>
              <Link href="/consulta_productos">Consulta de productos</Link>
            </li>
            <li>
              <Link href="/agregar_producto">Agregar Productos</Link>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
    );
  }
