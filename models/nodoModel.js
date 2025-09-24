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
import {username,password} from '../pssw.js'
import { login } from "../prueba_http.js"
const config={
    username: username,
    password: password,
}



export class NodeModel{
  static async getAll(){
    const token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl9TQyIsImp0aSI6IjVlZDZhYWU1LTg4M2EtNDcwYS04NmE3LWU0M2M1YjAwMDRmMyIsInVzZXJJZCI6ImE5ZDliYjI5LTUwMmYtNDcwOC1iZTg5LTRhNGI3ZTk1NmUxYiIsImVtYWlsIjoiYWRtaW5Ac2MuY29tIiwicm9sZSI6InVzZXIiLCJFbnRlcnByaXNlIjoiU2FuIENyaXN0b2JhbCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NTg2NzkzMzgsImV4cCI6MTc1ODcyMjUzOCwiaWF0IjoxNzU4Njc5MzM4LCJpc3MiOiJwdWxzYXJ1c2VycyIsImF1ZCI6InB1bHNhcmF1ZGllbmNlIn0.IPsE81YdFetmBYnrqbt2VOyLxla9nr0T2BD1Ocrg9HQ'
    try{
      const res=await fetch('https://cosmosblastingtools.com/pulsaronline/api/v1/data/nodes/',{ 
      method:'GET',
      headers:{
      'Authorization':token,
      'Content-Type':'application/json'
          }

       });
       const data=await res.json();
       //console.log('datos del modelo:', data)
       return data;


      }catch(err){
      console.log(err);
      }
   
  }
  
}