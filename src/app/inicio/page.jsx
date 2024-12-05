"use client"; // Esto es necesario si estás usando Next.js con React 18+ para que el hook useEffect funcione en un componente cliente.

import React from "react";
import { toast, Toaster } from "react-hot-toast";
import LogoutButton from "../components/LogoutButton";
import { useRouter } from "next/navigation";

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    padding: "20px",
    backgroundColor: "#fff7e6", // Fondo cálido
    color: "#5a352a", // Tonos tierra
    minHeight: "100vh",
    position: "relative",
  },
  logoutButtonContainer: {
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2rem",
    color: "#b55e3c", // Color cálido para el título
  },
  hero: {
    textAlign: "center",
    margin: "20px 0",
    backgroundColor: "#ffe4cc",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heroText: {
    fontSize: "1.2rem",
    marginBottom: "15px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#d67d45",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#c36b3e",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  productCard: {
    backgroundColor: "#fff",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  productImage: {
    width: "100%",
    borderRadius: "10px",
  },
  productTitle: {
    fontSize: "1rem",
    margin: "10px 0",
    color: "#5a352a",
  },
};

export default function Inicio() {
  const router = useRouter();

  const products = [
    { id: 1, name: "Estambre Suave", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Estambre Multicolor", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Agujas de Tejer", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Kit de Ganchillo", image: "https://via.placeholder.com/150" },
  ];

  const handleToast = () => {
    toast("¡Explora nuestra colección de estambres!", {
      icon: "🧶",
      duration: 3000,
    });
  };

  const handleExplore = () => {
    router.push("/consulta_productos");
  };

  return (
    <div style={styles.container}>
      <Toaster position="top" reverseOrder={false} />
      <div style={styles.logoutButtonContainer}>
        <LogoutButton />
      </div>
      <h1 style={styles.header}>
        Bienvenido al sistema de información de la Casita de Estambre!
      </h1>
      <div style={styles.hero}>
        <p style={styles.heroText}>
          Descubre los mejores materiales para tus proyectos de tejido y crochet.
          ¡Inspiración y calidad en un solo lugar!
        </p>
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={handleExplore}
        >
          Explorar
        </button>
      </div>
      <div style={styles.productList}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.productImage}
            />
            <h3 style={styles.productTitle}>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
