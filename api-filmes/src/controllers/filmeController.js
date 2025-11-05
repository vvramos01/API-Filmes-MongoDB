import Filme from "../models/Filme.js";

export const criarFilme = async (req, res) => {
  try {
    const novo = new Filme(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const listarFilmes = async (req, res) => {
  const { genero, diretor, titulo } = req.query;
  let filtro = {};
  if (genero) filtro.genero = new RegExp(genero, "i");
  if (diretor) filtro.diretor = new RegExp(diretor, "i");
  if (titulo) filtro.titulo = new RegExp(titulo, "i");

  const filmes = await Filme.find(filtro).sort({ createdAt: -1 });
  res.json(filmes);
};

export const avaliarFilme = async (req, res) => {
  try {
    const { id } = req.params;
    const { nota, comentario } = req.body;

    const filme = await Filme.findById(id);
    if (!filme) return res.status(404).json({ erro: "Filme não encontrado." });

    filme.avaliacoes.push({ usuario: req.usuario.nome, nota, comentario });

    // Recalcula média
    const total = filme.avaliacoes.reduce((acc, a) => acc + a.nota, 0);
    filme.mediaAvaliacoes = Number((total / filme.avaliacoes.length).toFixed(1));

    await filme.save();
    res.json(filme);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
