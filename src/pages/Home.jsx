const Home = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white shadow-2xl rounded-3xl p-12 mx-6 max-w-3xl transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">
              Bienvenido a tu tienda de camaras
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Gestiona tus cámaras, películas y alquileres de manera eficiente. 
              Explora tus opciones utilizando el menú de navegación.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  
  
  