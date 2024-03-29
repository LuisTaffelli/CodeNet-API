const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// PARA CARGAR DATOS
//const DataUsers = require("../Mockups/DB_USERS.json");
//const dataPosts = require("../Mockups/DB_Posts.json");
// const {User} = require('./src/db.js');

const {
  DB_userCreates,
  DB_postCreates,
  DB_AdminSignUp,
} = require("./src/routes/utils.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    //CARGA DE DATOS
    //PASOS A SEGUIR :
    //1---> DESCOMENTE PRIMERO: DB_userCreates(DataUsers)
    //2---> COMENTE: DB_userCreates(DataUsers)
    //3---> DESCOMENTE SEGUNDO:  DB_postCreates(dataPosts)
    //4---> COMENTE: DB_postCreates(dataPosts)

    // DB_userCreates(DataUsers);

    // DB_postCreates(dataPosts);

    
    //Descomentar y comentar una sola vez!! Para crear el admin

    // DB_AdminSignUp()
    console.log(`${process.env.PORT} LISTENING`); // eslint-disable-line no-console
  });
});
