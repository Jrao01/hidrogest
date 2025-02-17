const { DataTypes } = require('sequelize');
const sequelize = require('../config/conexion.js');

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    cedula: {
        type: DataTypes.STRING(9),
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING(11),
        allowNull:false
    },
    sectorId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    coordenadasCasa: {
        allowNull: false,
        type: DataTypes.STRING(200)
    },
    tipoPropiedad: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    cedulaOwner: {
        type: DataTypes.STRING(9),
        allowNull: false
    },
    alquilado: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    personasEnvivienda: {
        allowNull: false,
        type: DataTypes.NUMBER
    },
    password: {
        type: DataTypes.STRING(8),
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true
});

module.exports = Users;
