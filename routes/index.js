import { Router } from "express";
export const homerouter = Router();
//import { home } from "../controllers/home_controller.js";
import { NodeController } from "../controllers/Node_controller.js";
import { GeofonoController } from "../controllers/Geofono_Controller.js";
import { UserRepository } from "../models/user-repository.js";
import { home } from "../controllers/home_controller.js";
import { UserController } from "../controllers/user-controller.js";
//import { socket } from "../config/socket.js";
//import { verifiToken } from "../config/verifitoken.js";
import { verifitoken } from "../config/verifitoken.js";
//export const homerouter=router.get("/", home);

homerouter.post("/login", UserController.login);
homerouter.get("/node", NodeController.getInfo);
homerouter.get("/triaxial", GeofonoController.getInfo);
homerouter.get("/evento", NodeController.getEvent);
//homerouter.get("/espectro", GeofonoController.getSpectro);

homerouter.get("/", async (req, res) => {
  const t = await verifitoken();
  console.log("token: ", t);
  const { user } = req.session;
  console.log(user);
  if (!user) {
    return res.render("login");
  }
  res.render("home", { t });
});
homerouter.get("/espectro", NodeController.getspectro);
homerouter.get("/triggers", NodeController.getTriggers);
