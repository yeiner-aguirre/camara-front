import React from 'react';
import { camerasService } from '../services/api.js';

const CameraCard = ({ camera, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm(`¿Está seguro de eliminar la cámara "${camera.marca} ${camera.modelo}"?`)) {
      try {
        await camerasService.delete(camera.id);
        onDelete(camera.id); 
      } catch (err) {
        console.error('Error al eliminar la cámara:', err);
        alert('Ocurrió un error al eliminar la cámara. Intente nuevamente.');
      }
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 relative bg-white hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{camera.marca} {camera.modelo}</h3>
      <p className="text-sm text-gray-600 mb-1">ID: {camera.id}</p>
      <p className="text-sm text-gray-600 mb-1">Marca: {camera.marca}</p>
      <p className="text-sm text-gray-600 mb-1">Modelo: {camera.modelo}</p>
      <p className="text-sm text-gray-600">Soporta flash: {camera.soporte_flash === 'si' ? 'Sí' : 'No'}</p>
      <button
        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mt-4"
        onClick={handleDelete}
      >
        Eliminar
      </button>
    </div>
  );
};

export default CameraCard;