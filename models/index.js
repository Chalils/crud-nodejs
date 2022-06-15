const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.js")(sequelize, Sequelize);
db.orders = require("./orders.js")(sequelize, Sequelize);
db.users.hasMany(db.orders, { as: "orders", onDelete: 'cascade', onUpdate: 'cascade' });
db.orders.belongsTo(db.users, 
{
  foreignKey: "userId",
  as: "users",
});
module.exports = db;