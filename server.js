const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const run = async () => {
  const controller = require("./controllers/createdata");

  // Create and Save a new Orders
  const usr1 = await controller.createUser({
    nama: "User 1",
    description: "User 1 Description",
  });

  // Create and Save a new Orders
  const usr2 = await controller.createUser({
    nama: "User 2",
    description: "User 2 Description",
  });

  const comment1 = await controller.createOrders(usr1.id, {
    nama_pesanan: "Orderan 1",
    keterangan: "Ini hanya testing saja",
  });

  const comment2 = await controller.createOrders(usr1.id, {
    nama_pesanan: "Orderan 2",
    keterangan: "Ini hanya keterangan biasa",
  });

  const comment3 = await controller.createOrders(usr2.id, {
    nama_pesanan: "Orderan 3",
    keterangan: "Ini Order dari user ketiga",
  });

  const tut1Data = await controller.findUserById(usr1.id);
  console.log(
    ">> Tutorial id=" + tut1Data.id,
    JSON.stringify(tut1Data, null, 2)
  );

  // const dat = await controller.findAll();
  // console.log(">> All user", JSON.stringify(dat, null, 2));
};
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// var bodyParser = require('body-parser');
var formData = require('express-form-data');
// parse requests of content-type - application/json
// app.use(express.json());
// app.use(formData.json());
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
app.use(formData.parse());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
require("./routes/routes")(app);