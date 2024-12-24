import React, { useState } from 'react';
import { camerasService } from '../services/api';

const CameraForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    soporte_flash: 'no'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await camerasService.create(formData);
      if (response.data.id) {
        onSave(response.data); // Pasa directamente los datos al callback
        onClose();
      } else {
        throw new Error('No se recibió confirmación de la cámara creada');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        setError(error.response.data.error || 'Error al crear la cámara');
      } else if (error.request) {
        setError('Error de conexión. Por favor, verifique su conexión a internet.');
      } else {
        setError('Error al procesar la solicitud. Por favor, intente nuevamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Nueva Cámara</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Soporta Flash</label>
            <select
              name="soporte_flash"
              value={formData.soporte_flash}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            >
              <option value="no">No</option>
              <option value="si">Sí</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CameraForm;