import express, { json } from "express";
const app = express();
const port = process.env.PORT || 3000;
//app.use("/", require("./routes/index"));
//import db from "./config/pg.js";
//import Sensor from "./models/sensorschema.mjs";
import { homerouter } from "./routes/index.js";
app.use(express.static("./static"));
//import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
//import expressLayouts from "express-ejs-layouts";
import { UserRepository } from "./models/user-repository.js";
import { obtenerToken } from "./config/conn.js";
import jwt from "jsonwebtoken";
//import { nullable } from "zod";
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token);
  //let data = null;
  req.session = { user: null };
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.session.user = data;
  } catch (error) {
    //req.session.user = null;
  }
  next();
});
let tokenCache = null;
let tokenexpiration = 0;

//app.use(verifitoken);
/* const verificarToken = (req, res, next) => {
  console.log(req.body);
  //const token = obtenerToken();
  if (token) {
    next();
  } else {
    console.log({ message: "token expirado o no valido" });
    res.render("login");
  }
}; */
//app.use(verificarToken);
//app.use(expressLayouts);

/* app.get('/',function(req,res){
  return res.send('<h1>proyecto de grado</h1>')
}) */
app.get("/", (req, res) => {
  //const { user } = req.session;
  res.render("login");
});
/* app.post("/register", async ( {req, res} ) => {
  console.log("cuerpo de la solicitud: ", req.body);
  const { username, password } = req.body;
  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
}); */
app.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
});
app.use("/dashboard", homerouter);

/* app.use((req,res)=>{
  res.status(404).send('<h1>404</h1>')
}) */
app.listen(port, "0.0.0.0", function (err) {
  if (err) {
    console.log("Error: ", err);
  }
  console.log("Server is running on port:", port);
});
