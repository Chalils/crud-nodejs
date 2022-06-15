
const db = require("../models");
const Users = db.users;
const Orders = db.orders;
const Op = db.Sequelize.Op;

exports.createUser = (user) => {
  return Users.create({
    nama: user.nama,
    description: user.description,
  })
    .then((user) => {
      console.log(">> Created user: " + JSON.stringify(user, null, 4));
      return user;
    })
    .catch((err) => {
      console.log(">> Error while creating user: ", err);
    });
};


exports.createOrders = (userId, order) => {
  return Orders.create({
    nama_pesanan: order.nama_pesanan,
    keterangan: order.keterangan,
    userId: userId,
  })
    .then((order) => {
      console.log(">> Created order: " + JSON.stringify(order, null, 4));
      return order;
    })
    .catch((err) => {
      console.log(">> Error while creating order: ", err);
    });
};

exports.findUserById = (userId) => {
  return Users.findByPk(userId, { include: ["orders"] })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log(">> Error while finding user: ", err);
    });
};

exports.findAll = (req, res) => {
  const nama = req.query.nama;
  var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;
  var con1 = { id: { [Op.eq]: 1 } };
  Users.findAll({ where: condition,
    order: [
        ['id', 'DESC'],
        ['nama', 'ASC'],
    ], 
    include: 
    [
      {
        model:db.orders, as:'orders'
      }
    ]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};