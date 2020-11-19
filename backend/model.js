
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

// PapiloPay
const topup = sequelize.define('topup',{
  id : {
    type : DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true
  },
  tanggal : {
    type : DataTypes.DATE,
  },
  jumlah : {
    type : DataTypes.DOUBLE
  }
})

const papilopay = sequelize.define('papilopay',{
  id : {
    type : DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true
  },
  amount : {
    type : DataTypes.DOUBLE,
  }
})

// Order
const order = sequelize.define('order',{
  id : {
    type : DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true
  },
  total_harga :{
      type : DataTypes.DOUBLE
  },
  status :{
      type : DataTypes.STRING
  },
  payment_date :{
    type : DataTypes.DATE
  }
})

const orderDetails = sequelize.define('orderDetails',{
  id : {
    type : DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true
  },
  jumlah :{
      type : DataTypes.INTEGER
  },
  harga :{
      type : DataTypes.DOUBLE
  }
})

// Shipping
const shippingDetails = sequelize.define('shippingDetails',{
  id : {
    type : DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true
  },
  alamat_sender :{
      type : DataTypes.STRING
  },
  alamat_receiver :{
      type : DataTypes.STRING
  },
  shipping_type : {
      type : DataTypes.STRING
  },
  fee : {
      type: DataTypes.DOUBLE
  }
})

seller.hasMany(product);
product.belongsTo(seller);

customer.hasMany(topup);
topup.belongsTo(customer);

customer.hasOne(papilopay);
papilopay.belongsTo(customer);

order.hasMany(orderDetails);
orderDetails.belongsTo(order);

product.hasMany(orderDetails);
orderDetails.belongsTo(product);

order.hasOne(shippingDetails);
shippingDetails.belongsTo(order);

customer.hasMany(order);
order.belongsTo(customer);

seller.hasMany(order);
order.belongsTo(seller);

transportCompany.hasMany(shippingDetails);
shippingDetails.belongsTo(transportCompany);

sequelize.sync({force : false, alter: true})

// sequelize.sync({force : true})

module.exports = {
  customer: customer,
  seller: seller,
  transportCompany: transportCompany,
  product: product,
  order: order,
  orderDetails: orderDetails,
  shippingDetails: shippingDetails,
  topup: topup,
  papilopay: papilopay
}