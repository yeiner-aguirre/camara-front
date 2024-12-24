import React, { useEffect, useState } from 'react';
import { rentalsService } from '../services/api';
import RentalCreate from '../components/RentalCreate';

const RentalList = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const fetchRentals = async () => {
        try {
            const response = await rentalsService.getAll();
            setRentals(response.data);
        } catch (err) {
            setError('Error al obtener los alquileres');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentals();
    }, []);

    const handleRentalCreated = () => {
        setShowCreateForm(false);
        fetchRentals(); // Actualiza la lista después de crear un alquiler
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Alquileres</h1>
            <button
                onClick={() => setShowCreateForm(true)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Crear Nuevo Alquiler
            </button>
            {showCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded shadow-md p-6 w-96">
                        <button
                            onClick={() => setShowCreateForm(false)}
                            className="absolute top-2 right-2 text-red-500 text-lg font-bold"
                        >
                            ×
                        </button>
                        <RentalCreate onRentalCreated={handleRentalCreated} />
                    </div>
                </div>
            )}
            <table className="min-w-full table-auto bg-white shadow-md rounded">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Cliente</th>
                        <th className="px-4 py-2">Camara</th>
                        <th className="px-4 py-2">Inicio</th>
                        <th className="px-4 py-2">Fin</th>
                        <th className="px-4 py-2">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map((rental) => (
                        <tr key={rental.id} className="border-t">
                            <td className="px-4 py-2">{rental.id}</td>
                            <td className="px-4 py-2">{rental.id_cliente}</td>
                            <td className="px-4 py-2">{rental.id_item}</td>
                            <td className="px-4 py-2">{rental.fecha_inicio}</td>
                            <td className="px-4 py-2">{rental.fecha_fin}</td>
                            <td className="px-4 py-2">{rental.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RentalList;