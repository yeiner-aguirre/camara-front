import React, { useState } from 'react';
import { rentalsService } from '../services/api';

const RentalCreate = ({ onRentalCreated }) => {
    const [form, setForm] = useState({
        id_cliente: '',
        id_item: '',
        fecha_inicio: '',
        fecha_fin: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage('');

        try {
            await rentalsService.create(form);
            setMessage('Alquiler creado exitosamente.');
            onRentalCreated(); // Notifica al padre que se creó un alquiler
        } catch (err) {
            setError(err.response?.data?.error || 'Error al crear el alquiler');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Crear Alquiler</h1>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_cliente">
                        ID Cliente
                    </label>
                    <input
                        id="id_cliente"
                        name="id_cliente"
                        type="number"
                        value={form.id_cliente}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_item">
                        ID Camara
                    </label>
                    <input
                        id="id_item"
                        name="id_item"
                        type="number"
                        value={form.id_item}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_inicio">
                        Fecha de Inicio
                    </label>
                    <input
                        id="fecha_inicio"
                        name="fecha_inicio"
                        type="date"
                        value={form.fecha_inicio}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_fin">
                        Fecha de Fin
                    </label>
                    <input
                        id="fecha_fin"
                        name="fecha_fin"
                        type="date"
                        value={form.fecha_fin}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Crear Alquiler
                </button>
            </form>
        </div>
    );
};

export default RentalCreate;


