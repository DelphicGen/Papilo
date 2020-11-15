const express = require('express')
const cors = require('cors')
const model = require('./model.js')
const crypto = require('crypto')
var jwt = require("jsonwebtoken");
const verifyToken = require('./verify.js');

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

    res.send({
        "role" : "customer",
        status : 'ok'
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

    res.send({
        "role" : "seller",
        status : 'ok'
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

    res.send({
        "role" : "transportCompany",
        status : 'ok'
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


app.listen(4000)