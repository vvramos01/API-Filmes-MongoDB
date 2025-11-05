import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const existente = await Usuario.findOne({ email });
    if (existente) return res.status(400).json({ erro: "Email já cadastrado." });

    const novo = new Usuario({ nome, email, senha });
    await novo.save();
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    const valido = await bcrypt.compare(senha, usuario.senha);
    if (!valido) return res.status(401).json({ erro: "Senha incorreta." });

    const token = jwt.sign({ id: usuario._id, nome: usuario.nome }, process.env.JWT_SECRET, { expiresIn: "6h" });
    res.json({ msg: "Login bem-sucedido!", token });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
