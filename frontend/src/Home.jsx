import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-4 min-h-screen">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12">
        ¡Bienvenido, Entrenador!
      </h1>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-12 max-w-4xl mx-auto">
        <div
          className="flex flex-col items-center p-8 bg-white rounded-lg shadow-2xl hover:shadow-3xl transform transition duration-300 hover:scale-105 cursor-pointer border-4 border-poke-red hover:border-poke-blue"
          onClick={() => navigate("/trainers")}
        >
          <img
            src="https://play.pokemonshowdown.com/sprites/trainers/red.png"
            alt="Entrenador"
            className="w-48 h-48 object-contain mb-4 drop-shadow-lg"
          />
          <h2 className="text-3xl font-pixel text-poke-red mb-4">
            Entrenadores
          </h2>
          <p className="text-lg text-gray-700">
            Busca tus entrenadores Pokémon.
          </p>
        </div>
        <div
          className="flex flex-col items-center p-8 bg-white rounded-lg shadow-2xl hover:shadow-3xl transform transition duration-300 hover:scale-105 cursor-pointer border-4 border-poke-blue hover:border-poke-red"
          onClick={() => navigate("/pokedex")}
        >
          <img
            src="https://play.pokemonshowdown.com/sprites/gen5/dragonite.png"
            alt="Dragonite"
            className="w-48 h-48 object-contain mb-4 drop-shadow-lg scale-100"
          />
          <h2 className="text-3xl font-pixel text-poke-blue mb-4">Pokédex</h2>
          <p className="text-lg text-gray-700">
            Descubre tus Pokémones favoritos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;