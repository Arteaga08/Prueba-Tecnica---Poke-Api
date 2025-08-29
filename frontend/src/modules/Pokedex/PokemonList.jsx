import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchPokemon();
  }, [page, search, limit]);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/api/pokedex", {
        params: {
          page,
          limit,
          search,
        },
      });
      setPokemonList(response.data.results);
      setTotalCount(response.data.count);
    } catch (error) {
      console.error("Error al obtener los Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDownloadReport = async (id, name) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/pokedex/${id}/report/pdf`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      alert("Error al generar el reporte en PDF.");
    }
  };

  // Cal Total Number Pages
  const totalPages = Math.ceil(totalCount / limit);
  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-pixel text-center mb-8 text-poke-red">
        Pokedex
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-poke-blue"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div>
          <span className="text-gray-700">Pokémon por página:</span>
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="ml-2 py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-poke-blue"
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-xl text-gray-500">
          Cargando Pokédex...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemonList.map((pokemon) => (
            <div
              key={pokemon.name}
              className="group bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800 capitalize">
                  {pokemon.name}
                </h3>

                <button
                  onClick={() => handleDownloadReport(pokemon.id, pokemon.name)}
                  className="mt-4 px-4 py-2 bg-yellow-600 text-white font-bold rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Reporte PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8 space-x-2">
        {/* First Page Button */}
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`px-3 py-1 font-bold rounded-lg shadow-md transition duration-300 disabled:opacity-50  ${
            page === 1 ? "bg-gray-300 text-gray-700" : "bg-gray-800 text-white"
          }`}
        >
          &lt;&lt;
        </button>
        {/* Last Page Button*/}
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-3 py-1 font-bold rounded-lg shadow-md transition duration-300 disabled:opacity-50 ${
            page === 1 ? "bg-gray-300 text-gray-700" : "bg-gray-800 text-white"
          }`}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 font-bold rounded-lg shadow-md transition duration-300 ${
              p === page ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next Pagen*/}
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className={`px-3 py-1 font-bold rounded-lg shadow-md transition duration-300 disabled:opacity-50 ${
            page >= totalPages
              ? "bg-gray-300 text-gray-700"
              : "bg-gray-800 text-white"
          }`}
        >
          &gt;
        </button>
        {/* Last Page */}
        <button
          onClick={() => setPage(totalPages)}
          disabled={page >= totalPages}
          className={`px-3 py-1 font-bold rounded-lg shadow-md transition duration-300 disabled:opacity-50 ${
            page >= totalPages
              ? "bg-gray-300 text-gray-700"
              : "bg-gray-800 text-white"
          }`}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
