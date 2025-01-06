const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const quality_control = sequelize.define(
    'quality_control',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      check_name: {
        type: DataTypes.TEXT,
      },

      compliance: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  quality_control.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.quality_control.belongsTo(db.work_orders, {
      as: 'work_order',
      foreignKey: {
        name: 'work_orderId',
      },
      constraints: false,
    });

    db.quality_control.belongsTo(db.users, {
      as: 'quality_control_officer',
      foreignKey: {
        name: 'quality_control_officerId',
      },
      constraints: false,
    });

    db.quality_control.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.quality_control.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.quality_control.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return quality_control;
};
