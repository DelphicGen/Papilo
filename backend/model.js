
require('dotenv').config()

const { Sequelize,DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,process.env.DB_PASSWORD,{
  host : 'dev-story.my.id',
  dialect : 'mysql',
  port : process.env.DB_PORT
})

// buat model untuk tiap table pada database
const customer = sequelize.define('customer',{
  id : { 
    type : DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true
  },
  email : {
    type : DataTypes.STRING,
    unique : true
  },
  password : {
    type : DataTypes.STRING
  },
})

const seller = sequelize.define('seller',{
    id : {
      type : DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },
    email : {
      type : DataTypes.STRING,
      unique : true
    },
    password : {
      type : DataTypes.STRING
    },
    storeName :{
        type : DataTypes.STRING
    }
})

const transportCompany = sequelize.define('transportCompany',{
    id : {
      type : DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },
    email : {
      type : DataTypes.STRING,
      unique : true
    },
    password : {
      type : DataTypes.STRING
    },
    companyName :{
        type : DataTypes.STRING
    }
})


const product = sequelize.define('product',{
    id : {
      type : DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },
    productName :{
        type : DataTypes.STRING
    },
    type :{
        type : DataTypes.STRING
    },
    stock : {
        type : DataTypes.INTEGER
    },
    price : {
        type : DataTypes.DOUBLE
    },
  })

seller.hasMany(product);
product.belongsTo(seller);

sequelize.sync({force : false, alter: true})

// sequelize.sync({force : true})

module.exports = {
  customer: customer,
  seller: seller,
  transportCompany: transportCompany,
  product: product
}