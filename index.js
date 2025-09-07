const fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) =>{
    res.end('Server Up and running')
})

server.listen(7000, '127.0.0.1', () => {
    console.log('Started Listening')
})