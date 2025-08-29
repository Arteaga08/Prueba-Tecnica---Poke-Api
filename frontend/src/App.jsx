import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./index.css";
import AppRoutes from "./ComponentsRoutes.jsx";

function App() {
  return (
    <Router>
      <div className="bg-poke-gray min-h-screen">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                  alt="Pokémon Logo"
                  className="h-12 md:h-14"
                />
              </Link>
            </div>
            <div className="space-x-4 ml-auto">
              <Link
                to="/trainers"
                className="text-lg font-medium text-gray-700 hover:text-poke-blue"
              >
                Entrenadores
              </Link>
              <Link
                to="/pokedex"
                className="text-lg font-medium text-gray-700 hover:text-poke-blue"
              >
                Pokedex
              </Link>
            </div>
          </div>
        </nav>

        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
