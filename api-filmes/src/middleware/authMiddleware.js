import jwt from "jsonwebtoken";

export const autenticar = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ erro: "Acesso negado. Token ausente." });

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decodificado;
    next();
  } catch (err) {
    res.status(400).json({ erro: "Token inválido." });
  }
};
