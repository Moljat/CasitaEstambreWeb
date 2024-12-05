import { useRouter } from "next/navigation";

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#d9534f", // Rojo llamativo para el botón de cierre de sesión
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  buttonHover: {
    backgroundColor: "#c9302c", // Rojo más oscuro al pasar el cursor
  },
};

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token
    window.location.reload(); // Recarga la página
    router.push("/inicio"); // Redirige a la página de inicio de sesión
  };

  return (
    <button
      style={styles.button}
      onMouseEnter={(e) =>
        (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
      }
      onMouseLeave={(e) =>
        (e.target.style.backgroundColor = styles.button.backgroundColor)
      }
      onClick={handleLogout}
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
