import { Link } from "react-router-dom";

const BaseLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Cabecera */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Alquiler de Cámaras</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/cameras" className="hover:underline">
                  Cámaras
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:underline">
                  Películas
                </Link>
              </li>
              <li>
                <Link to="/rentals" className="hover:underline">
                  Alquileres
                </Link>
              </li>
              <li>
                <Link to="/clients" className="hover:underline">
                  Clientes
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Alquiler de Cámaras</p>
      </footer>
    </div>
  );
};

export default BaseLayout;
