import React, { useEffect, useState } from 'react';
import { moviesService } from '../services/api';
import MovieCreate from '../components/MovieCreate';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await moviesService.getAll();
            // Asegurarse de que los datos se establecen correctamente
            if (response && response.data) {
                setMovies(response.data);
            }
        } catch (err) {
            setError('Error al obtener las películas');
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleCreateSuccess = async (newMovie) => {
        await fetchMovies(); // Recargar la lista completa
        setShowCreateForm(false);
    };

    const handleCloseForm = () => {
        setShowCreateForm(false);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Películas</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => setShowCreateForm(true)}
            >
                Nueva Película
            </button>
            
            {showCreateForm && (
                <MovieCreate 
                    onSuccess={handleCreateSuccess}
                    onClose={handleCloseForm}
                />
            )}
            
            {movies.length === 0 ? (
                <p className="text-gray-600">No hay películas disponibles.</p>
            ) : (
                <table className="min-w-full table-auto bg-white shadow-md rounded">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Marca</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">ISO</th>
                            <th className="px-4 py-2">Formato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2 text-center">{movie.id}</td>
                                <td className="px-4 py-2">{movie.marca}</td>
                                <td className="px-4 py-2">{movie.nombre}</td>
                                <td className="px-4 py-2 text-center">{movie.sensibilidad_iso}</td>
                                <td className="px-4 py-2">{movie.formato}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MovieList;