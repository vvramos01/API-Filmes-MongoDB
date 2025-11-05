import mongoose from "mongoose";

const avaliacaoSchema = new mongoose.Schema({
  usuario: String,
  nota: { type: Number, min: 0, max: 10 },
  comentario: String,
  data: { type: Date, default: Date.now }
});

const filmeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  diretor: String,
  genero: String,
  ano: Number,
  mediaAvaliacoes: { type: Number, default: 0 },
  avaliacoes: [avaliacaoSchema]
}, { timestamps: true });

export default mongoose.model("Filme", filmeSchema);
