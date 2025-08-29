import { Router } from "express";
import axios from "axios";
import PDFDocument from "pdfkit";

const router = Router();

let allPokemons = [];

const fetchAllPokemons = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10000"
    );
    allPokemons = response.data.results.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    console.log("Todos los Pokémon han sido obtenidos y ordenados.");
  } catch (error) {
    console.error("Error al obtener todos los Pokémon:", error);
  }
};

fetchAllPokemons();

router.get("/", async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    let results = [...allPokemons];

    // Search Logic
    if (search) {
      const searchTerm = search.toLowerCase();
      results = results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
    }

    const totalCount = results.length;

    // Page Logic
    if (!page || !limit) {
      const detailedPromises = results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          id: details.data.id,
          name: details.data.name,
          image: details.data.sprites.other["official-artwork"].front_default,
        };
      });
      const detailedPokemons = await Promise.all(detailedPromises);
      return res.status(200).json({
        count: totalCount,
        results: detailedPokemons,
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum <= 0 || limitNum <= 0) {
      return res
        .status(400)
        .json({ message: "Parámetros de paginación no válidos." });
    }

    if (offset >= totalCount && totalCount > 0) {
      return res
        .status(400)
        .json({ message: "La página solicitada no existe." });
    }

    const filteredAndOrderedSubset = results.slice(offset, offset + limitNum);

    // POKE Details
    const detailedPromises = filteredAndOrderedSubset.map(async (pokemon) => {
      const details = await axios.get(pokemon.url);
      return {
        id: details.data.id,
        name: details.data.name,
        image: details.data.sprites.other["official-artwork"].front_default,
      };
    });

    const detailedPokemons = await Promise.all(detailedPromises);

    res.status(200).json({
      count: totalCount,
      results: detailedPokemons,
    });
  } catch (error) {
    console.error("Error en la ruta /api/pokedex:", error);
    res.status(500).json({ message: "Error al obtener los Pokémon." });
  }
});

// PDF
router.get("/:id/report/pdf", async (req, res) => {
  try {
    const { id } = req.params;

    // API
    const pokemonResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const pokemonData = pokemonResponse.data;

    // Poke Info
    const abilityName = pokemonData.abilities[0].ability.name;
    const typeName = pokemonData.types
      .map((typeInfo) => typeInfo.type.name)
      .join(", ");
    const imageUrl =
      pokemonData.sprites.other["official-artwork"].front_default;

    // Download Poke Img
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(imageResponse.data);

    // Create PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${pokemonData.name}.pdf`
    );
    doc.pipe(res);

    // PDF config
    doc.fillColor("#FF4500");
    doc
      .fontSize(28)
      .font("Helvetica-Bold")
      .text("Pokédex", { align: "center" });
    doc.moveDown(0.5);
    doc.fillColor("#4169E1");
    doc.fontSize(20).text(`Detalles de ${pokemonData.name.toUpperCase()}`, {
      align: "center",
    });

    doc.moveDown(1.5);

    doc.image(imageBuffer, {
      fit: [200, 200],
      align: "center",
      valign: "center",
    });

    doc.moveDown(1);
    doc.fillColor("#000000");
    doc
      .fontSize(16)
      .text(`Número de Pokédex:`, { continued: true })
      .fillColor("#4B0082")
      .text(` ${pokemonData.id}`);
    doc.moveDown(0.5);
    doc.fillColor("#000000");
    doc
      .fontSize(16)
      .text(`Habilidad principal:`, { continued: true })
      .fillColor("#4B0082")
      .text(` ${abilityName}`);
    doc.moveDown(0.5);
    doc.fillColor("#000000");
    doc
      .fontSize(16)
      .text(`Tipo(s):`, { continued: true })
      .fillColor("#4B0082")
      .text(` ${typeName}`);

    //Footer
    doc.moveDown(2);
    doc
      .strokeColor("#FFD700")
      .lineWidth(2)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor("#888888").text("Pokédex", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al generar el reporte PDF." });
  }
});

export default router;
