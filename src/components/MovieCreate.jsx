import React, { useState } from 'react';
import { moviesService } from '../services/api';

const MovieCreate = ({ onSuccess, onClose }) => {
    const [form, setForm] = useState({
        marca: '',
        nombre: '',
        sensibilidad_iso: '',
        formato: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Opciones válidas para los campos enum
    const isoOptions = [50, 100, 200, 400, 800, 1600];
    const formatoOptions = ['35mm', '110mm', '120mm'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
        // Limpiar mensajes al cambiar valores
        setError(null);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setMessage('');

        // Validaciones
        if (!isoOptions.includes(Number(form.sensibilidad_iso))) {
            setError('Sensibilidad ISO no válida');
            setIsSubmitting(false);
            return;
        }

        if (!formatoOptions.includes(form.formato)) {
            setError('Formato no válido');
            setIsSubmitting(false);
            return;
        }

        try {
            // Asegurarse de que sensibilidad_iso se envía como número
            const dataToSend = {
                ...form,
                sensibilidad_iso: Number(form.sensibilidad_iso)
            };
            
            const response = await moviesService.create(dataToSend);
            setMessage('Película creada exitosamente.');
            
            // Limpiar formulario
            setForm({
                marca: '',
                nombre: '',
                sensibilidad_iso: '',
                formato: '',
            });
            
            // Esperar un momento para mostrar el mensaje de éxito
            setTimeout(() => {
                onSuccess(response.data);
            }, 1000);
        } catch (err) {
            console.error('Error creating movie:', err);
            setError(err.response?.data?.error || 'Error al crear la película.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Nueva Película</h2>
                <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>
            
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    {message}
                </div>
            )}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">
                        Marca
                    </label>
                    <input
                        id="marca"
                        name="marca"
                        type="text"
                        value={form.marca}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={form.nombre}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sensibilidad_iso">
                        Sensibilidad ISO
                    </label>
                    <select
                        id="sensibilidad_iso"
                        name="sensibilidad_iso"
                        value={form.sensibilidad_iso}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                        disabled={isSubmitting}
                    >
                        <option value="">Seleccione ISO</option>
                        {isoOptions.map(iso => (
                            <option key={iso} value={iso}>
                                ISO {iso}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formato">
                        Formato
                    </label>
                    <select
                        id="formato"
                        name="formato"
                        value={form.formato}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                        disabled={isSubmitting}
                    >
                        <option value="">Seleccione Formato</option>
                        {formatoOptions.map(formato => (
                            <option key={formato} value={formato}>
                                {formato}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creando...' : 'Crear Película'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MovieCreate;