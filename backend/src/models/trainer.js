import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Escribe un nombre de entrenador."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Escribe tu apellido."],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Escribe tu numero de telefono."],
      trim: true,
    },
    medalsWon: {
      type: Number,
      required: [true, "Escribe tu numero de medallas."],
      min: [0, "El numero de medallas no puede ser negativo"],
    },
    pokemons: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pokemon",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;