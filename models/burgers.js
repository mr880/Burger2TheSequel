
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  });

  Burger.associate = function(models) {

    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Burger;
};
