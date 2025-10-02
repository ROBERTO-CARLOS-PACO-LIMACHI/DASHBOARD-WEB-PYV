const Sequelize =require("sequelize") ;
const sequelize = new Sequelize(
  "postgresql://neondb_owner:npg_uMGREHOJf58P@ep-bold-sun-aewvc9qs-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=requirea",
);
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully. ");
  } catch (error) {
    console.error("unable to connect to the database:", error);
  }
}
testConnection();
module.exports=sequelize;
//const pgp = require('pg-promise')(/*options */)
/* const db=pgp('postgresql://neondb_owner:npg_uMGREHOJf58P@ep-bold-sun-aewvc9qs-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=requirea')
db.one('select $1 AS value ',123)
  .then((data)=>{
    console.log( 'DATA: ',data.value)
  })
  .catch((error)=>{
    console.log('EROOR: ',error)
  })
module.exports=db; */
