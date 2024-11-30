
"use client";

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
      className="bg-cover bg-no-repeat py-20 hover:shadow-indigo-500/40   w-ful shadow-md z-10"
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
          <nav className="hidden lg:flex font-semibold relative">
              <ul className="flex justify-around space-x-16 cursor-pointer">
                <li className="relative group">
                  <Link
                    href="/inicio"
                    className="relative z-10 text-black group-hover:text-white px-2 transition-all duration-300"
                  >
                    Inicio
                  </Link>
                  <span className="absolute inset-0 bg-black opacity-0 blur-md filter transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg rounded-md"></span>
                </li>
                <li className="relative group">
                  <Link
                    href="/consulta_productos"
                    className="relative z-10 text-black group-hover:text-white px-2 transition-all duration-300"
                  >
                    Consulta de productos
                  </Link>
                  <span className="absolute inset-0 bg-black opacity-0 blur-md filter transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg rounded-md"></span>
                </li>
                <li className="relative group">
                  <Link
                    href="/agregar_producto"
                    className="relative z-10 text-black group-hover:text-white px-2 transition-all duration-300"
                  >
                    Agregar Productos
                  </Link>
                  <span className="absolute inset-0 bg-black opacity-0 blur-md filter transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg rounded-md"></span>
                </li>
                <li className="relative group">
                  <a
                    href="/agregar_proveedor"
                    className="relative z-10 text-black group-hover:text-white px-2 transition-all duration-300"
                  >
                    Proveedores
                  </a>
                  <span className="absolute inset-0 bg-black opacity-0 blur-md filter transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg rounded-md"></span>
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
        <nav className="lg:hidden  text-white font-semibold"
        style={{
          textAlign: "Right",
        }}>
          <ul className="flex flex-col items-center space-y-4 py-4 ">
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
              <a href="/agregar_proveedor" className="hover:text-gray-400">
                Agregar Proveedor
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
    );
  }
