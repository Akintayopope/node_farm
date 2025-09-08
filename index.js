const fs = require('fs')
const http = require('http')
const url = require('url');



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
        return output
} 


const cards = fs.readFileSync(`${__dirname}/templates/card_product.html`, 'utf-8')

const products = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')

const productsOverview = fs.readFileSync(`${__dirname}/templates/product_overview.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')

const dataObject = JSON.parse(data) // convert to js object/array

// Server Creation
const server = http.createServer((req, res) => {
 const {pathname, query} = url.parse(req.url, true)

 // Overview page

if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {"Content-type": 'text/html'})

    const cardsMarkup = dataObject.map(el => replaceTemplate(cards, el)).join("")

    const result = productsOverview.replace('{%product_card%}', cardsMarkup)

    res.end(result)

} else if (pathname === '/product') {
    res.writeHead(200, {"Content-type": 'text/html'})
    const product = dataObject[query.id]
    const result = replaceTemplate(products, product)

    res.end(result)

} 
// page not found
else {
    res.writeHead(400, {
        "Content-type": "text/html"
    })
     res.end('<h1>Page not found!</h1>');
}
  
});


server.listen(7000, '127.0.0.1', () => {
    console.log('Started Listening')
})


