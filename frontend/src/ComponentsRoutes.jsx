import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import TrainersList from "./modules/Trainers/TrainerList.jsx";
import PokemonList from "./modules/Pokedex/PokemonList.jsx";

const AppRoutes = () => {
  return (
    <main className="py-8 -mt-16">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainers" element={<TrainersList />} />
        <Route path="/pokedex" element={<PokemonList />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;