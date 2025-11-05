import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { conectarBanco } from "./config/db.js";
import filmeRoutes from "./routes/filmeRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao banco
conectarBanco();

// Rotas API
app.use("/filmes", filmeRoutes);
app.use("/usuarios", usuarioRoutes);

// Servir front-end estático
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "public")));

// Rota raiz - serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
