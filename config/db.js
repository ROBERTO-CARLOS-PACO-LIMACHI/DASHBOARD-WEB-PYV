import mongoose from "mongoose";
const conectarDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://roberto:abc123$@cluster0.uypodwv.mongodb.net/db-sismico",
    );
    console.log("conectado a la base de datos");
  } catch (err) {
    console.log("error al conectarse a la base de datos: ", err);
  }
};
export default conectarDB;
