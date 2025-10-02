/* const { Sequelize, DataTypes } =require("sequelize");
import sequelize from "../config/pg.js";
 const   Sensor = sequelize.define("Sensor", {
  nro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
  },
  x: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  y: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  z: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}); */
//console.log(Sensor === sequelize.models.Sensor);
//console.log("definiendo esquema de sensor");
//import { username, password } from "../pssw.js";
import { verifitoken } from "../config/verifitoken.js";
import { login } from "../prueba_http.js";

export class NodeModel {
  static async getAll() {
    try {
      const token = await verifitoken();
      //console.log(token);
      const res = await fetch(
        "https://cosmosblastingtools.com/pulsaronline/api/v1/data/nodes/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      //console.log("datos del modelo:", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getspectro(id) {
    const token = await verifitoken();
    try {
      const res = await fetch(
        `https://cosmosblastingtools.com/pulsaronline/api/v1/data/spectrum-event?triggerId=${id}&rangeSeconds=10&version=v2.0`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      //console.log('datos del modelo:', data)
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getevent(id) {
    const token = await verifitoken();
    try {
      const res = await fetch(
        `https://cosmosblastingtools.com/pulsaronline/api/v1/data/geofonos-event?triggerId=${id}&rangeSeconds=10&version=v2.0`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      //console.log('datos del modelo:', data)
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async gettriggers(initialdate, lastdate) {
    const token = await verifitoken();
    try {
      const res = await fetch(
        `https://cosmosblastingtools.com/pulsaronline/api/v1/data/triggers?offset=0&limit=20&start_time=${initialdate}&end_time=${lastdate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log("modelo fechas: ", initialdate, lastdate);
      const data = await res.json();
      // console.log("datos del modelo:", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
