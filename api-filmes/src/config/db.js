import mongoose from "mongoose";

export const conectarBanco = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar:", err.message);
    process.exit(1);
  }
};
