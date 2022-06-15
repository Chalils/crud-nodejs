const db = require("../models");
const Orders = db.orders;
const Op = db.Sequelize.Op;
// Create and Save a new Orders
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nama_pesanan) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Orders
    const tutorial = {
      nama_pesanan: req.body.nama_pesanan,
      keterangan: req.body.keterangan
    };
    // Save Orders in the database
    Orders.create(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Orders."
        });
      });
  };
// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
    const nama_pesanan = req.query.nama_pesanan;
    var condition = nama_pesanan ? { nama_pesanan: { [Op.like]: `%${nama_pesanan}%` } } : null;
    Orders.findAll({ where: condition })
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
// Find a single Orders with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Orders.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Orders with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Orders with id=" + id
        });
      });
  };
// Update a Orders by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Orders.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Orders was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Orders with id=${id}. Maybe Orders was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Orders with id=" + id
      });
    });
};
// Delete a Orders with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Orders.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Orders was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Orders with id=${id}. Maybe Orders was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Orders with id=" + id
        });
      });
  };
// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Orders.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Orders were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };