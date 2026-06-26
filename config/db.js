import mongoose from "mongoose";
const conectarDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://roberto:abc123$@ac-iva4srm-shard-00-00.uypodwv.mongodb.net:27017,ac-iva4srm-shard-00-01.uypodwv.mongodb.net:27017,ac-iva4srm-shard-00-02.uypodwv.mongodb.net:27017/?ssl=true&replicaSet=atlas-740bbj-shard-0&authSource=admin&appName=Cluster0",
    );
    console.log("conectado a la base de datos");
  } catch (err) {
    console.log("error al conectarse a la base de datos: ", err);
  }
};
export default conectarDB;
