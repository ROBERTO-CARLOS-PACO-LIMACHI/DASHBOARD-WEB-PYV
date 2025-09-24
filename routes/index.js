import { Router } from "express";
export const homerouter = Router();
import { home } from "../controllers/home_controller.js";
import { NodeController } from "../controllers/Node_controller.js";
import { GeofonoController } from "../controllers/Geofono_Controller.js";
//export const homerouter=router.get("/", home);
homerouter.get('/',NodeController.getall)
homerouter.get('/node',NodeController.getInfo);
homerouter.get('/triaxial',GeofonoController.getInfo);
homerouter.get('/espectro',GeofonoController.getSpectro);
homerouter.get('/event',GeofonoController.getEvent);


