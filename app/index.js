const express = require('express')
const { getProducts, getProductsByName} = require('./lib/productsapifunctions')

const app = express()
const port = process.env.port || 8080;

const passport = require('passport')
const { JWTStrategy } = require('@sap/xssec')
const xsenv = require('@sap/xsenv')

//XSUAA as middleware
passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa))

app.use(passport.initialize())
app.use(passport.authenticate('JWT', {session: false}))

//serve static file
app.use('/', express.static('static/'))


app.listen(port, () => {
    console.log(`App is listening to the port ${port}`)
})

app.get('/products', checkReadScope, getProducts)

function checkReadScope(req, res, next) {
    console.log(req.authInfo)
    if(req.authInfo.checkLocalScope('read')){
        return next()
    } else {
        console.log('Missing the expected scope')
        res.status(403).end('Forbidden')
    }
}


