import { Router } from "express";
export const homerouter = Router();
//import { home } from "../controllers/home_controller.js";
import { NodeController } from "../controllers/Node_controller.js";

import { UserRepository } from "../models/user-repository.js";

import { UserController } from "../controllers/user-controller.js";
//import { socket } from "../config/socket.js";
//import { verifiToken } from "../config/verifitoken.js";
import { verifitoken } from "../config/verifitoken.js";
import { username } from "../pssw.js";
//export const homerouter=router.get("/", home);
import { auditoria } from "../middlewares/auditoria.js";
import { AuditController } from "../controllers/audit_controller.js";

homerouter.get("/update", NodeController.update);
homerouter.get("/node", NodeController.getInfo);

homerouter.get("/event", NodeController.event);
homerouter.post("/ad7606/start/:uuid", auditoria, NodeController.start);
homerouter.post("/ad7606/stop/:uuid", auditoria, NodeController.stop);
homerouter.get("/spectro", NodeController.spectro);
//homerouter.get("/espectro", GeofonoController.getSpectro);
homerouter.get("/dispositivos", async (req, res) => {
  const t = await verifitoken();
  res.render("dispositivos", { t });
});
homerouter.get("/find", UserController.findAll);
homerouter.get("/usuarios", async (req, res) => {
  const t = await verifitoken();
  res.render("users", { t });
});

homerouter.get("/", async (req, res) => {
  //console.log("token: ", t);
  const t = await verifitoken();
  const { user } = req.session;
  console.log(user);
  if (!user) {
    return res.render("login");
  }
  res.render("home", { t });
});

homerouter.get("/auditoria", AuditController.getAuditoria);

homerouter.get("/triggers", NodeController.getTriggers);
homerouter.delete("/deleteEvent/:id", auditoria, NodeController.EliminarEvento);
homerouter.get("/event/last", NodeController.getLast);
homerouter.post("/addEvento", NodeController.addEvento);
