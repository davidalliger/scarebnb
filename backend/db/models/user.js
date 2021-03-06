'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
const Image = require('./image');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Username cannot be an email address.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail(value) {
          if (!Validator.isEmail(value)) {
            throw new Error('Email must be a valid email address.');
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: [
          'hashedPassword',
          'createdAt',
          'updatedAt'
        ]
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  User.prototype.toSafeObject = function() {
    const { id, username, email } = this;
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };


  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Image, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Haunt, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Spooking, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId'
    });
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findOne({
      where: {
        id: user.id
        }
      });
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findOne({
        where: {
          id: user.id
          },
          include: [Image]
        });
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findOne({
      where: {
        id: user.id
        },
        include: [Image]
      });
  };

  return User;
};
