const Koa = require('koa');
const https = require('https');
const fs = require('fs')
const webpush = require('web-push')
const { bodyParser } = require("@koa/bodyparser");
const cors = require('@koa/cors');
const app = new Koa();


app.use(cors());
app.use(bodyParser())

// 使用 web-push 需要的公钥和密钥。由 web-push 命令行生成，其中公钥 publicKey 客户端应留存一份，在客户端配置订阅推送服务时传入。
const vapidKeys = {
    "publicKey": "BCnmqk6EF_Blunfxlrk3oTMU26Y7TyKwZk5LxIhF_4VH9DJn49EN48-1Nxgf9WLATGrel4OtxGYdxZCMw189Kt0",
    "privateKey": "kIKt8vppmeiTRukDpcDwHK5s0CvKAexEWoaddNaNXr4"
}

// https 配置
const options = {
    key: fs.readFileSync('../https-cert/localhost+2-key.pem'),
    cert: fs.readFileSync('../https-cert/localhost+2.pem')
}

let subscription = null

// 使用公钥和私钥加密推送服务。
webpush.setVapidDetails(
    'mailto:royinrao@qq.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);



app.use(async ctx => {
    // 当客户端请求推送服务网。则向客户端进行推送。
    if (ctx.path === '/push' ) {
        // 把客户端订阅信息传入服务器
        subscription = ctx.request.body
        // 向订阅者进行推送
        webpush.sendNotification(subscription, JSON.stringify({
            message:   'Push message from server!',
            title: 'Push successful'
        }))

        ctx.body = 'done'
        return
    }

    ctx.body = 'Hello World';
});


https.createServer(options, app.callback()).listen(3000)


