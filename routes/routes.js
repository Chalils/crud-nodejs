module.exports = app => {
    const users = require("../controllers/users_controller.js");
    const orders = require("../controllers/orders_controller.js");
    const user_order = require("../controllers/createdata.js");
    // sementara route nya dibanyakin dulu blum nemu cara simpelnya
    var router = require("express").Router();
    var routerorders = require("express").Router();
    var routeall = require("express").Router();
    // Create a new Tutorial
    router.post("/", users.create);
    // Retrieve all Tutorials
    router.get("/findall", users.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
    // Update a Tutorial with id
    router.put("/:id", users.update);
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
    // Delete all Tutorials
    router.delete("/", users.deleteAll);
    // Create a new Tutorial
    routerorders.post("/", orders.create);
    // Retrieve all Tutorials
    routerorders.get("/", orders.findAll);
    // Retrieve a single Tutorial with id
    routerorders.get("/:id", orders.findOne);
    // Update a Tutorial with id
    routerorders.put("/:id", orders.update);
    // Delete a Tutorial with id
    routerorders.delete("/:id", orders.delete);
    // Delete all Tutorials
    routerorders.delete("/", orders.deleteAll);
    
    routeall.get("/", user_order.findAll);
    
    app.use('/api/users', router);
    app.use('/api/orders', routerorders);
    app.use('/api/all', routeall);
  };