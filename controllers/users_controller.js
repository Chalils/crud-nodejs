const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Users
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.nama) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }
//     // Create a Users
//     const tutorial = {
//       nama: req.body.nama,
//       description: req.body.description,
//       published: req.body.published ? req.body.published : false
//     };
//     // Save Users in the database
//     Users.create(tutorial)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Users."
//         });
//       });
//   };

// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const nama = req.query.nama;
//   var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;
//   Users.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     });
// };

exports.create= async(req, res)=>
{
   try {
       const response = await Users.create({
          nama       : req.body.nama,
          description: req.body.description
        });
      //  res.json(response);
      console.log('Membuat data berhasil'); 
   } catch (error) {
       console.log(error.message); 
   }
}

exports.findAll= async(req, res)=>
{
   try {
      const nama = req.query.nama;
      var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;
      const response = await Users.findAll({condition});
      res.json(response);
   } catch (error) {
      console.log(error.message); 
   }
}


// Find a single Users with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Users.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Users with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Users with id=" + id
        });
      });
  };
// Update a Users by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Users was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Users with id=" + id
      });
    });
};
// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Users was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Users with id=" + id
        });
      });
  };
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Users.destroy({
      where   : {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };