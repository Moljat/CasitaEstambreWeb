"use client"; // Esto es necesario si estás usando Next.js con React 18+ para que el hook useEffect funcione en un componente cliente.

import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import LogoutButton from "../components/LogoutButton";

export default function Inicio() {




  return (
    <div>
      <Toaster position="top" reverseOrder={false} />
      <h1>Lista de Productos</h1>
      <LogoutButton />
    </div>
  );
}