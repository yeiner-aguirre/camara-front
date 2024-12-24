import React, { useEffect, useState } from 'react';
import { clientsService } from '../services/api';
import ClientCreate from '../components/ClientCreate';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clientsService.getAll();
        setClients(response.data);
      } catch (err) {
        setError('Error al cargar los clientes. Por favor, inténtelo nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleCreateSuccess = (newClient) => {
    setClients([...clients, newClient]);
    setShowCreateForm(false);
  };

  if (loading) {
    return <div className="text-center mt-4">Cargando clientes...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Lista de Clientes</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        {showCreateForm ? 'Cancelar' : 'Nuevo Cliente'}
      </button>
      {showCreateForm && <ClientCreate onSuccess={handleCreateSuccess} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-lg font-bold mb-2">{client.nombre}</h3>
            <p className="text-sm text-gray-600 mb-1">ID: {client.id}</p>
            <p className="text-sm text-gray-600">Email: {client.email}</p>
            <p
              className={`text-sm font-semibold ${
                client.camara_alquilada === 'Sí' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              Cámara alquilada: {client.camara_alquilada}
            </p>
            <p
              className={`text-sm font-semibold ${
                client.multa_activa === 'Sí' ? 'text-red-500' : 'text-green-500'
              }`}
            >
              Multa activa: {client.multa_activa}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;


