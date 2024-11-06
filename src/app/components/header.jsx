
import React from "react";
import Image from 'next/image'

export default function Header() {
    return (
        <header 
        className="bg-cover bg-fixed bg-no-repeat bg-center text-white py-20" 
        style={{ backgroundImage: "url('header.jpg')" }}
        >

      
      <div className="flex justify-between items-center px-6">
       
        <div className="flex items-center ">
            
            <Image
            src="/window.svg"
            width={75}
            height={75}
            alt="Picture of the author"
            style={ {
                paddingRight: "30px"
            }} />
          
          <h1 className="text-3xl font-bold" style={[
            { fontFamily: "var(--font-geist-sans)" },
            { fontFamily: "var(--font -geist-mono)" }
            
            
          ]} >Casita de estambre</h1>
        </div>

        <nav>
          <ul className="flex justify-around space-x-16 ">
            <li><a href="" className="hover:text-gray-400">Home</a></li>
            <li><a href="/about" className="hover:text-gray-400">About</a></li>
            <li><a href="/services" className="hover:text-gray-400">Services</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
            
          </ul>
        </nav>
      </div>
    </header>
    );
  }
