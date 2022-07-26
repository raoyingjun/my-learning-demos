const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const session = require('koa-session');

const app = new Koa();
const router = new Router();

app.keys = ['dsadsadsa'];
 
const config = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 10 * 1000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(config, app));
app.use(static('./static'));
app.use(static('./views', {extensions: ['html']}));
app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods());
app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.redirect('/404.html');
    }
});


router.get('/setCookie', async ctx => {
    ctx.cookies.set('uid', '7', { 
        maxAge: 10 * 1000
    });
    ctx.body = 'setCookie';
});
router.get('/getCookie', async ctx => {
    if (ctx.cookies.get('uid')) {
        ctx.body = ctx.cookies.get('uid');
    } else {
        ctx.body = 'cookie was expired';
    }
    
});
router.post('/login', async ctx => {
    ctx.body = ctx.request.body;
});
router.get('/base64', async ctx => {
    ctx.body = Buffer.from('hello').toString('base64');
});
router.get('/setSession', async ctx => {
    ctx.session.uid = '9';
    ctx.body = 'setSession';
});
router.get('/getSession', async ctx => {
    if (ctx.session.uid) {
        ctx.body = ctx.session.uid;
    } else {
        ctx.body = 'session was expired';
    }
});

app.listen(3000);