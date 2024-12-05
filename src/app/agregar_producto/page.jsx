"use client";

import React, { useState } from "react";
import AltaProd from "./AltaProd";
import ProvTable from "./ProvTable";
import ProdTable from "./ProdTable";
import Ayuda from "./Ayuda";
import { Toaster } from "react-hot-toast";

const ProductForm = () => {
    const [selectedId, setSelectedId] = useState(null);



    const handleSetSelectedId = (id) => {
        setSelectedId(id);
    };



    return (
      <div className="pt-20">
        <Toaster />
         <h1  className="text-8xl bg-transparent " style={{ flexBasis: "100%", textAlign: "center"}}>ALTA DE PRODUCTOS</h1> 
        <div
        className="flex-grow"
        style={{
          display: "flex", 
          flexDirection: "row", 
          alignItems: "flex-start", 
          justifyContent: "center", 
          flexWrap: "wrap", 
          gap: "30px", 
          padding: "50px",
          width: "100%", 
          
        }}
      >
       
        
        <ProvTable  setSelectedId={handleSetSelectedId}    /> 
        <AltaProd selectedId={selectedId}   /> 
        <ProdTable className="pt-12" style={{ flex: "1 1 100%" }} /> 
       
      </div>
      <div className="pt-36">
      <Ayuda />

      </div>
      </div>
    );
};
export default ProductForm;
