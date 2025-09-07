const fs = require('fs')
const http = require('http')


const cards = fs.readFileSync(`${__dirname}/templates/card_product.html`, 'utf-8')

const products = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')

const productsOverview = fs.readFileSync(`${__dirname}/templates/product_overview.html`, 'utf-8')

console.log(productsOverview)

const server = http.createServer((req, res) =>{
    res.end('Server Up and running')
})

server.listen(7000, '127.0.0.1', () => {
    console.log('Started Listening')
})

