import express, { json } from "express";
const app = express();
const port = process.env.PORT || 3000;
//app.use("/", require("./routes/index"));
//import db from "./config/pg.js";
//import Sensor from "./models/sensorschema.mjs";
import { homerouter } from "./routes/index.js";
app.use(express.static("./static"));
import expressLayouts from "express-ejs-layouts";
app.use(json())

 app.set("view engine", "ejs");
app.set("views", "./views"); 
//app.use(expressLayouts);
console.log("hola mundo");
/* app.get('/',function(req,res){
  return res.send('<h1>proyecto de grado</h1>')
}) */
app.use('/dashboard',homerouter)
  /* app.use((req,res)=>{
  res.status(404).send('<h1>404</h1>')
}) */
app.listen(port, "0.0.0.0", function (err) {
  if (err) {
    console.log("Error: ", err);
  }
  console.log("Server is running on port:", port);
});
