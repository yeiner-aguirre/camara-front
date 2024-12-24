// CameraList.jsx
import React, { useEffect, useState } from 'react';
import CameraCard from '../components/CameraCard.jsx';
import CameraForm from '../components/CameraForm.jsx';
import { camerasService } from '../services/api.js';

const CameraList = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = async () => {
    try {
      const response = await camerasService.getAll();
      setCameras(response.data);
    } catch (err) {
      setError('Error al cargar las cámaras. Por favor, inténtelo nuevamente.');
      console.error('Error al cargar cámaras:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setCameras((prev) => prev.filter((camera) => camera.id !== id));
  };

  const handleAddCamera = (cameraData) => {
    setCameras(prev => [...prev, cameraData]); // Usa directamente el dato que viene de `onSave`
    setShowForm(false);
  };

  if (loading) return <div className="text-center mt-4">Cargando cámaras...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Lista de Cámaras</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
        onClick={() => setShowForm(true)}
      >
        Crear Cámara
      </button>
      {showForm && (
        <CameraForm onClose={() => setShowForm(false)} onSave={handleAddCamera} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cameras.map((camera) => (
          <CameraCard key={camera.id} camera={camera} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default CameraList;