const Koa = require('koa');
const staticServe = require('koa-static');
const path = require('path');
const app = new Koa();

const staticPath = path.resolve(__dirname, '../dist');
console.log(staticPath)
app.use(staticServe(staticPath));

app.listen(3000, () => console.log('启动成功'));