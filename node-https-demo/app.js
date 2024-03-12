const Koa = require('koa');
const https = require('https');
const fs = require('fs')
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

https.createServer(options, app.callback()).listen(3000)