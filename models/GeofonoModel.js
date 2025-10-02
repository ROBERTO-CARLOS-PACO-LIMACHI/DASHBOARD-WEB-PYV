import {username,password} from '../pssw.js'
import { login } from "../prueba_http.js"
import {obtenerToken} from '../config/conn.js'
//const token=obtenerToken()
const config={
    username: username,
    password: password,
}

export class GeofonoModel{
  static async getInfo(){
    const token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl9TQyIsImp0aSI6Ijc3MjAwMGJlLTZkN2QtNGM1Mi05N2M2LWY2Yzc3YTA1MmE0NyIsInVzZXJJZCI6ImE5ZDliYjI5LTUwMmYtNDcwOC1iZTg5LTRhNGI3ZTk1NmUxYiIsImVtYWlsIjoiYWRtaW5Ac2MuY29tIiwicm9sZSI6InVzZXIiLCJFbnRlcnByaXNlIjoiU2FuIENyaXN0b2JhbCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NTg2NTIxMTIsImV4cCI6MTc1ODY5NTMxMiwiaWF0IjoxNzU4NjUyMTEyLCJpc3MiOiJwdWxzYXJ1c2VycyIsImF1ZCI6InB1bHNhcmF1ZGllbmNlIn0.RlwLO7AnLLDtyWk_6QIdqn4mJmUi8bKheG3uqRB9tck'
    try{
      const res=await fetch('https://cosmosblastingtools.com/pulsaronline/api/v1/nodes/81924341-44c6-423a-a6fd-f671055b3bf3/triaxial',{ 
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