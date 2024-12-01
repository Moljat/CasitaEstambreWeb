"use client";

import React, { useState } from "react";
import AltaProd from "./AltaProd";
import ProvTable from "./ProvTable";
import ProdTable from "./ProdTable";

const ProductForm = () => {
    const [selectedId, setSelectedId] = useState(null);



    const handleSetSelectedId = (id) => {
        setSelectedId(id);
    };



    return (
        <div
        className=""
        style={{
          display: "flex", 
          flexDirection: "row", 
          alignItems: "flex-start", 
          justifyContent: "space-around", 
          flexWrap: "wrap", 
          gap: "20px", 
          padding: "20px",
          width: "100%", 
        }}
      >
        <h1  className="text-8xl" style={{ flexBasis: "100%", textAlign: "center"}}>ALTA DE PRODUCTOS</h1> 
        <ProvTable  setSelectedId={handleSetSelectedId}    /> 
        <AltaProd selectedId={selectedId}   /> 
        <ProdTable  style={{ flex: "1 1 100%" }} /> 
      </div>
    );
};
export default ProductForm;
