const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%product_name%}/g, product.productName);
  output = output.replace(/{%product_image%}/g, product.image);
  output = output.replace(/{%product_country%}/g, product.from);
  output = output.replace(/{%product_nutrient%}/g, product.nutrients); 
  output = output.replace(/{%product_price%}/g, product.price);
  output = output.replace(/{%product_quantity%}/g, product.quantity);
  output = output.replace(/{%product_description%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%SLUG%}/g, product.slug); 

  if (!product.organic) {
    output = output.replace(/{%not_organic%}/g, 'not-organic'); 
  }
  return output;
};

const cards = fs.readFileSync(`${__dirname}/templates/card_product.html`, 'utf-8');
const products = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const productsOverview = fs.readFileSync(`${__dirname}/templates/product_overview.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// add slug to each product
dataObject.forEach(el => {
  el.slug = slugify(el.productName, { lower: true });
});

// Server
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsMarkup = dataObject.map(el => replaceTemplate(cards, el)).join('');
    const result = productsOverview.replace('{%product_card%}', cardsMarkup);

    return res.end(result);
  }

  if (pathname.startsWith('/product/')) {
    const slug = pathname.split('/product/')[1] || '';
    const product = dataObject.find(el => el.slug === slug);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h1>Product not found</h1>');
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    const result = replaceTemplate(products, product);
    return res.end(result);
  }

  res.writeHead(404, { 'Content-Type': 'text/html' });
  return res.end('<h1>Page not found!</h1>');
});

server.listen(7000, '127.0.0.1', () => {
  console.log('Started Listening');
});
