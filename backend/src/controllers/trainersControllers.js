import Trainer from "../models/trainer.js";

// Create Trainer
export const createTrainer = async (req, res) => {
  try {
    console.log("Petición POST recibida en /api/trainers");
    console.log("Cuerpo de la petición:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      console.log("El cuerpo de la petición está vacío. Enviando error 400.");
      return res
        .status(400)
        .json({ message: "El cuerpo de la petición no puede estar vacío." });
    }

    const newTrainer = new Trainer(req.body);

    console.log("Intentando guardar el nuevo entrenador...");
    await newTrainer.save();

    console.log("Entrenador guardado exitosamente:", newTrainer);
    res.status(201).json(newTrainer);
  } catch (error) {
    console.error("Error al guardar el entrenador:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ errors: messages });
    }
    res
      .status(500)
      .json({ message: "Error en el servidor al crear el entrenador." });
  }
};

//Get All Trainers
export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor al obtener todos los entrenadores.",
    });
  }
};

//Get Trainer by Id
export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: "Entrenador no encontrado." });
    }
    res.status(200).json(trainer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor al obtener el entrenador." });
  }
};

//Delete Trainer
export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: "Entrenador no encontrado." });
    }
    res.status(200).json({ message: "Entrenador eliminado exitosamente." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor al eliminar el entrenador." });
  }
};

//Update Trainer
export const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!trainer) {
      return res.status(404).json({ message: "Entrenador no encontrado." });
    }
    res.status(200).json(trainer);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ errors: messages });
    }
    res
      .status(500)
      .json({ message: "Error en el servidor al actualizar el entrenador." });
  }
};

//Csv
export const generateCsvReport = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    if (!trainers || trainers.length === 0) {
      return res
        .status(404)
        .json({
          message: "No se encontraron entrenadores para generar el reporte.",
        });
    }

    const headers = ["Nombre", "Apellido", "Numero de Telefono", "Medallas ganadas"].join(
      ","
    );
    const csvData = trainers
      .map((trainer) => {
        return [
          trainer.name,
          trainer.lastName,
          trainer.phoneNumber,
          trainer.medalsWon,
        ].join(",");
      })
      .join("\n");

    const csvString = `${headers}\n${csvData}`;

    res.header("Content-Type", "text/csv");
    res.attachment("trainers.csv");
    res.status(200).send(csvString);
  } catch (error) {
    console.error("Error al generar el reporte CSV:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al generar el reporte CSV." });
  }
};
