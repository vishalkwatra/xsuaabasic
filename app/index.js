const express = require('express')
const { getProducts, getProductsByName} = require('./lib/productsapifunctions')

const app = express()
const port = process.env.port || 8080;

//serve static file
app.use('/', express.static('static/'))

app.listen(port, () => {
    console.log(`App is listening to the port ${port}`)
})

app.get('/products', getProducts)


