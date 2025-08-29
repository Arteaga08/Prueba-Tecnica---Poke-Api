import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const TrainerForm = ({ trainerToEdit, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (trainerToEdit) {
      reset(trainerToEdit);
    } else {
      reset({
        name: "",
        lastName: "",
        phoneNumber: "",
        medalsWon: 0,
      });
    }
  }, [trainerToEdit, reset]);

  const onSubmit = async (data) => {
    console.log(data)
    setIsSubmitting(true);
    try {
      if (trainerToEdit) {
        await axios.put(
          `http://localhost:5001/api/trainers/${trainerToEdit._id}`,
          data
        );
      } else {
        await axios.post("http://localhost:5001/api/trainers", data);
      }
      onSave();
      reset();
    } catch (error) {
      console.error("Error al guardar el entrenador:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
        {trainerToEdit ? "Editar Entrenador" : "Crear Entrenador"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            {...register("name", { required: "El nombre es requerido" })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Apellidos</label>
          <input
            type="text"
            {...register("lastName", {
              required: "Los apellidos son requeridos",
            })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Número de Teléfono</label>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: "El teléfono es requerido",
            })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Medallas Obtenidas</label>
          <input
            type="number"
            {...register("medalsWon", {
              required: "Las medallas son requeridas",
              min: 0,
            })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.medalsWon && (
            <p className="text-red-500 text-sm mt-1">
              {errors.medalsWon.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition duration-300 disabled:opacity-50"
        >
          {isSubmitting
            ? "Guardando..."
            : trainerToEdit
            ? "Guardar Cambios"
            : "Crear Entrenador"}
        </button>
      </form>
    </div>
  );
};

export default TrainerForm;
