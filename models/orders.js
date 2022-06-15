module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define("orders", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama_pesanan: {
      type: Sequelize.STRING
    },
    keterangan: {
      type: Sequelize.STRING
    }
  });
  return Orders;
};