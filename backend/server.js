import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import trainerRoutes from "./src/routes/trainersRoutes.js";
import pokedexRoutes from "./src/routes/pokedexRoutes.js"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/trainers", trainerRoutes);
app.use("/api/pokedex", pokedexRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDb exitosamente 🚀");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ✨`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err.message);
  });