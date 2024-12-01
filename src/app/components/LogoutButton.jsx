import { useRouter } from "next/navigation"; 

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Elimina el token
    router.push('/inicio');  // Redirige a la página de inicio de sesión
    window.location.reload();  // Recarga la
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default LogoutButton;