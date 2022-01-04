const products = require('./products.json')


function getProducts(req, res) {
    res.setHeader('Content-Type', 'application/json')
    const result = []
    console.log(products)
    for (const product in products) {
        result.push(products[product])
    }
    res.send(result)
}

function getProductsByName(req, res) {
    console.log(req.query.name)
    res.setHeader('Content-Type', 'application/json')
    if (products.hasOwnProperty(req.query.name)) {
        res.send([products[req.query.name]])
    } else {
        res.send([])
    }
}

module.exports = {
    getProducts,
    getProductsByName
}