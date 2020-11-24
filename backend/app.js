const express = require('express')
const cors = require('cors')
const model = require('./model.js')
const crypto = require('crypto')
var jwt = require("jsonwebtoken");
const verifyToken = require('./verify.js');
const { Op } = require('sequelize')

let app = express()
app.use(express.json())
app.use(cors())

// Customer
app.post('/customer/register',async (req,res) => {
    let body = req.body
    let passwordHash = crypto.createHash('sha256').update(body.password).digest('base64')
    const customer = await model.customer.create({
        "email" : body.email,
        "password" : passwordHash
    })
    .catch(error => {
        res.send({
            status : 'failed'
        })
    })

    let payload = {
        "role" : "customer",
        "id" : customer.id
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY)

    res.send({
        "role" : "customer",
        status : 'ok',
        token
    })
})

app.post('/customer/login',async(req,res)=>{
    let body = req.body
    let passwordHash = crypto.createHash('sha256').update(body.password).digest('base64')

    const customer = await model.customer.findOne({ where: { email: body.email, password: passwordHash } })

    if (customer == null) {
        return res.send({
            "status": "failed",
            "message": "wrong credential"
        })
    }

    let payload = {
        "role" : "customer",
        "id" : customer.id
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY)

    return res.send({
        "status": "ok",
        "role" : "customer",
        token
    })

})

app.post('/customer/retrieve/data', verifyToken, async (req, res) => {

    if (req.decode.role != 'customer') {
        return res.send({
            "status": "failed",
            "msg": "role is incorrect"
        })
    }

    const customer = await model.customer.findOne({ id: req.decode.id })
    if (customer == null) {
        return res.send({
            "status": "failed",
            "msg": 'user does not exist'
        })
    }
    return res.send({
        "status": 'ok',
        "data": customer
    })
})

app.post('/customer/update', verifyToken, async (req, res) => {
    let body = req.body

    if (req.decode.role != 'customer') {
        res.send({
            "status": "failed",
            "msg": "role is incorrect"
        })
    }
    let customer = await model.customer.findOne({ id: req.decode.id })
    if (customer == null) {
        return res.send({
            "status": "failed",
            "msg": "user does not exist"
        })
    }
    customer.address = body.address
    customer.name = body.name
    customer.handphone = body.handphone
    customer.city = body.city
    customer.save()

    return res.send({
        status: "ok"
    })
})

// Seller
app.post('/seller/register',async (req,res) => {
    let body = req.body
    let passwordHash = crypto.createHash('sha256').update(body.password).digest('base64')
    const seller = await model.seller.create({
        "email" : body.email,
        "password" : passwordHash,
        "storeName": body.storeName
    })
    .catch(error => {
        res.send({
            status : 'failed'
        })
    })

    let payload = {
        "role" : "seller",
        "id" : seller.id
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY)

    res.send({
        "role" : "seller",
        status : 'ok',
        token
    })
})

app.post('/seller/login',async(req,res)=>{
    let body = req.body
    let passwordHash = crypto.createHash('sha256').update(body.password).digest('base64')

    const seller = await model.seller.findOne({ where: { email: body.email, password: passwordHash } })

    if (seller == null) {
        return res.send({
            "status": "failed",
            "message": "wrong credential"
        })
    }

    let payload = {
        "role" : "seller",
        "id" : seller.id
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY)

    return res.send({
        "status": "ok",
        "role" : "seller",
        token
    })

})

app.post('/seller/retrieve/data', verifyToken, async (req, res) => {

    if (req.decode.role != 'seller') {
        return res.send({
            "status": "failed",
            "msg": "role is incorrect"
        })
    }

    const seller = await model.seller.findOne({ id: req.decode.id })
    if (seller == null) {
        return res.send({
            "status": "failed",
            "msg": 'user does not exist'
        })
    }
    return res.send({
        "status": 'ok',
        "data": seller
    })
})

app.post('/seller/update', verifyToken, async (req, res) => {
    let body = req.body

    if (req.decode.role != 'seller') {
        res.send({
            "status": "failed",
            "msg": "role is incorrect"
        })
    }
    let seller = await model.seller.findOne({ id: req.decode.id })
    if (seller == null) {
        return res.send({
            "status": "failed",
            "msg": "user does not exist"
        })
    }
    seller.address = body.address
    seller.storeName = body.storeName
    seller.handphone = body.handphone
    seller.city = body.city
    seller.save()

    return res.send({
        status: "ok"
    })
})

// Transport
app.post('/transport/register',async (req,res) => {
    let body = req.body
    let passwordHash = crypto.createHash('sha256').update(body.password).digest('base64')
    const transportCompany = await model.transportCompany.create({
        "email" : body.email,
        "password" : passwordHash,
        "companyName": body.companyName
    })
    .catch(error => {
        res.send({
            status : 'failed'
        })
    })

    let payload = {
        "role" : "transportCompany",
        "id" : transportCompany.id
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY)

    res.send({
        "role" : "transportCompany",
        status : 'ok',
        token
    })
})

app.post('/transport/login',async(req,res)=>{
    let body = req.body
    let passwordHash = crypto.createHash('sha256').update(body.password).digest('base64')

    const transportCompany = await model.transportCompany.findOne({ where: { email: body.email, password: passwordHash } })

    if (transportCompany == null) {
        return res.send({
            "status": "failed",
            "message": "wrong credential"
        })
    }

    let payload = {
        "role" : "transportCompany",
        "id" : transportCompany.id
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY)

    return res.send({
        "status": "ok",
        "role" : "transportCompany",
        token
    })
})

app.post('/transport/retrieve/data', verifyToken, async (req, res) => {

    if (req.decode.role != 'transportCompany') {
        return res.send({
            "status": "failed",
            "msg": "role is incorrect"
        })
    }

    const transportCompany = await model.transportCompany.findOne({ id: req.decode.id })
    if (transportCompany == null) {
        return res.send({
            "status": "failed",
            "msg": 'user does not exist'
        })
    }
    return res.send({
        "status": 'ok',
        "data": transportCompany
    })
})

app.post('/transport/update', verifyToken, async (req, res) => {
    let body = req.body

    if (req.decode.role != 'transportCompany') {
        res.send({
            "status": "failed",
            "msg": "role is incorrect"
        })
    }
    let transportCompany = await model.transportCompany.findOne({ id: req.decode.id })
    if (transportCompany == null) {
        return res.send({
            "status": "failed",
            "msg": "user does not exist"
        })
    }
    transportCompany.address = body.address
    transportCompany.storeName = body.storeName
    transportCompany.handphone = body.handphone
    transportCompany.city = body.city
    transportCompany.save()

    return res.send({
        status: "ok"
    })
})

// Product
app.post('/product/add', verifyToken, async(req,res)=>{
    let body = req.body
    if(req.decode.role != 'seller'){
        res.send({
            "status" : "failed",
            "msg" : "role is incorrect"
        })
    }

    model.product.create({
        productName: body.productName,
        type: body.type,
        stock: body.stock,
        price: body.price,
        sellerId: req.decode.id
    })
    res.send({
        status: "created",
        message: "Product added!",
    });
})

app.post('/product/get', async(req,res)=>{
    const products = await model.product.findAll()

    res.send({
        status: "ok",
        products,
    });
})

app.post('/product/seller/get', verifyToken, async(req,res)=>{
    const products = await model.product.findAll({ where: { sellerId: req.decode.id}})

    if(req.decode.role != 'seller'){
        res.send({
            "status" : "failed",
            "msg" : "role is incorrect"
        })
    }

    res.send({
        status: "ok",
        products,
    });
})

app.post('/product/edit', verifyToken, async(req,res)=>{
    let body = req.body

    if(req.decode.role != 'seller'){
        res.send({
            "status" : "failed",
            "msg" : "role is incorrect"
        })
    }

    let product = await model.product.findOne({where: {id : body.id}})
    product.productName = body.productName
    product.type = body.type
    product.stock = body.stock
    product.price = body.price
    product.save()
    
    res.send({
        status : "ok"
    })
})

app.post('/product/delete', verifyToken, async(req,res)=>{
    await model.product.destroy({ where: { id: req.body.id}})
    const products = await model.product.findAll({ where: { sellerId: req.decode.id}})

    res.send({
        status: "ok",
        products,
    });
})

app.post('/product/search', verifyToken, async (req, res) => {
    if (req.decode.role != 'customer') {
        return res.send({
            "status": "failed",
            "msg": "role is incorrect"
        })
    }

    let body = req.body
    let products = await model.product.findAll({
        where: {
            productName: {
                [Op.like]: `%${body.query}%`
            }
        }
    })
    return res.send({
        "status": "ok",
        products: products
    })
})

// Papilopay
app.post('/papilopay/get', verifyToken, async(req,res)=>{
    const papilopay = await model.papilopay.findAll({
        where: {customerId: req.decode.id}
    })

    res.send({
        status: "ok",
        papilopay,
    });
})

app.post('/papilopay/pay', verifyToken, async(req,res)=>{
    let body = req.body
    let orders = {}
    let papilopay = await model.papilopay.findOne({where: {customerId : req.decode.id}})
    papilopay.amount -= body.totalPrice
    papilopay.save()


    await body.cart.forEach(async item => {
        if(!(item.sellerId in orders)) {
            orders[item.sellerId] = {price: [item.total], count: [item.count], productId: [item.id]}
        } else {
            orders[item.sellerId].price.push(item.total)
            orders[item.sellerId].count.push(item.count)
            orders[item.sellerId].productId.push(item.id)
        }

        const product = await model.product.findOne({ where: { id: item.id}})
        product.stock -= item.count
        product.save()

    })

    
    let date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);
        
    for(const key in orders) {

        const order = await model.order.create({
            total_harga: orders[key].price.reduce((a, b) => (a + b), 0),
            status: "paid",
            customerId: req.decode.id,
            payment_date: date,
            sellerId: key
        });

        const transportCompany = await model.transportCompany.findOne({
            where: {companyName: body.transshipment}
        })

        const shippingDetails = await model.shippingDetails.create({
            alamat_receiver: body.address,
            shipping_type: 'Air Service',
            fee: 0,
            orderId: order.id,
            transportCompanyId: transportCompany.id,
            status: 'In Progress'
        })

        orders[key].price.forEach(async (val, index) => {
            const orderDetails = await model.orderDetails.create({
                jumlah: orders[key].count[index],
                harga: val,
                orderId: order.id,
                productId: orders[key].productId[index]
            })
        })

    }
    
    res.send({
        status : "ok"
    })
})

// Order
app.post('/order/get', verifyToken, async(req,res)=>{
    const orders = await model.order.findAll({
        where: {sellerId: req.decode.id}
    })

    const orderDetails = []

    for(const order of orders) {
        const temp = await model.orderDetails.findAll({
            where: {orderId: order.id}
        })

        for(const tempVal of temp) {
            const temp2 = await model.product.findOne({
                where: {id: tempVal.productId}
            })
            tempVal.dataValues.productName = temp2.productName
            orderDetails.push(tempVal)
        }

    }

    res.send({
        status: "ok",
        orderDetails
    });
})

// shipping
app.post('/shipping/get', verifyToken, async(req,res)=>{
    const transshipment = await model.shippingDetails.findAll({
        where: {transportCompanyId: req.decode.id}
    })

    res.send({
        status: "ok",
        transshipment
    });
})

app.post('/shipping/confirm', verifyToken, async(req,res)=>{
    if(req.decode.role != 'transportCompany'){
        res.send({
            "status" : "failed",
            "msg" : "role is incorrect"
        })
    }

    let body = req.body


    let editedTransshipment = await model.shippingDetails.findOne({where: {id : body.id}})
    editedTransshipment.status = "Done"
    await editedTransshipment.save()

    const transshipment = await model.shippingDetails.findAll({
        where: {transportCompanyId: req.decode.id}
    })
    
    res.send({
        status : "ok",
        transshipment
    })

})

app.post('/shipping/delete', verifyToken, async(req,res)=>{
    if(req.decode.role != 'transportCompany'){
        res.send({
            "status" : "failed",
            "msg" : "role is incorrect"
        })
    }

    await model.shippingDetails.destroy({
        where: {id: req.body.id}
    })

    const transshipment = await model.shippingDetails.findAll({
        where: {transportCompanyId: req.decode.id}
    })

    res.send({
        status: "ok",
        transshipment
    });
})

app.listen(4000)