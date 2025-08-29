import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaFileCsv, FaPlus } from "react-icons/fa";
import TrainerForm from "./TrainerForm.jsx";

const TrainersList = () => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, [refreshData]);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/trainers");
      setTrainers(response.data);
    } catch (error) {
      console.error("Error al obtener los entrenadores:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/trainers/${id}`);
      setIsFormVisible(false);
      setSelectedTrainer(null);
      setRefreshData((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar el entrenador:", error);
    }
  };

  const handleDownloadCsv = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/trainers/report/csv",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "entrenadores.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el CSV:", error);
    }
  };

  const handleEditClick = (trainer) => {
    setSelectedTrainer(trainer);
    setIsFormVisible(true);
  };

  const handleCreateClick = () => {
    setSelectedTrainer(null);
    setIsFormVisible(true);
  };

  const handleFormSave = () => {
    setIsFormVisible(false);
    setRefreshData((prev) => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-poke-red">
        Listado de Entrenadores Pokémon
      </h1>

      <div className="flex justify-between mb-4">
        <button
          onClick={handleCreateClick}
          className="flex items-center bg-red-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          <FaPlus className="mr-2" />
          Crear Entrenador
        </button>
        <button
          onClick={handleDownloadCsv}
          className="flex items-center bg-red-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          <FaFileCsv className="mr-2" />
          Generar Reporte CSV
        </button>
      </div>

      {isFormVisible && (
        <div className="mb-8">
          <TrainerForm
            trainerToEdit={selectedTrainer}
            onSave={handleFormSave}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Apellidos
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Medallas
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {trainer.name}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {trainer.lastName}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {trainer.phoneNumber}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {trainer.medalsWon}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  <div className="flex justify-end">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => handleEditClick(trainer)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(trainer._id)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainersList;
