const fs = require('fs')
const http = require('http')


const replaceTemplate = (template, product) =>{
    let output = template.replace(/{%product_name%}/g, product.productName)
    output = output.replace(/{%product_image%}/g, product.image)
    output = output.replace(/{%product_country%}/g, product.from)
    output = output.replace(/{%product_nutrient%}/g, product.nutrients)
    output = output.replace(/{%product_price%}/g, product.price)
    output = output.replace(/{%product_quantity%}/g, product.quantity)
    output = output.replace(/{%product_description%}/g, product.description)
    output = output.replace(/{%ID%}/g, product.id)
    
    if (!product.organic) output = output.replace(/{%not_organic%}/g, "not_organic")
} 




const cards = fs.readFileSync(`${__dirname}/templates/card_product.html`, 'utf-8')

const products = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')

const productsOverview = fs.readFileSync(`${__dirname}/templates/product_overview.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
console.log(data)


const server = http.createServer((req, res) =>{
    res.end('Server Up and running')
})

server.listen(7000, '127.0.0.1', () => {
    console.log('Started Listening')
})

