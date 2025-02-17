const {DataTypes} = require('sequelize');

const sequelize = require('../config/conexion.js');

const Sectores = sequelize.define('sectores',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nombre:{
        type :DataTypes.STRING(25),
        allowNull:false
    },
    habitantes:{
        type:DataTypes.NUMBER,
        allowNull:false,
        defaultValue:0
    },
    status:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    coords:{
        type:DataTypes.STRING(200),
        allowNull:false
    }

},{timestamps:true,freezeTableName:true}
)


module.exports = Sectores;
