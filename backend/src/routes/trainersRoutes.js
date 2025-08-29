import { Router } from "express";
import {
  createTrainer,
  deleteTrainer,
  generateCsvReport,
  getTrainerById,
  getTrainers,
  updateTrainer,
} from "../controllers/trainersControllers.js";

const router = Router();

router.get("/:id", getTrainerById);
router.put("/:id", updateTrainer);
router.delete("/:id", deleteTrainer);

router.post("/", createTrainer);
router.get("/", getTrainers);

router.get("/report/csv", generateCsvReport);

export default router;
