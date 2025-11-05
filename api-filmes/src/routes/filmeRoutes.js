import express from "express";
import { criarFilme, listarFilmes, avaliarFilme } from "../controllers/filmeController.js";
import { autenticar } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", autenticar, criarFilme);
router.get("/", listarFilmes);
router.post("/:id/avaliar", autenticar, avaliarFilme);

export default router;
