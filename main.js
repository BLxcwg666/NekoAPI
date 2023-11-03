// _   _      _           _    ____ ___ 
// | \ | | ___| | _____   / \  |  _ \_ _|
// |  \| |/ _ \ |/ / _ \ / _ \ | |_) | | 
// | |\  |  __/   < (_) / ___ \|  __/| | 
// |_| \_|\___|_|\_\___/_/   \_\_|  |___|
//
// Copyright © 2021-2023 NyaStudio, LLC
// Version 2.0 | By BLxcwg666 <huixcwg@gmail.com> @xcnya / @xcnyacn
// Lastest Update at 2023/11/4 01:30
//「 想说什么就说，想做什么就做，我们不就是这么一直过来的吗？」

const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const chalk = require("chalk");
const figlet = require("figlet");
const morgan = require("morgan");
const moment = require("moment");
const express = require("express");
const dotenv = require("dotenv").config();
const compression = require("compression");

const app = express();
const version = '2.0';
const host = process.env.HOST;
const port = process.env.PORT;
const is443 = process.env.PORT === '443';
const ssl = process.env.ENABLE_SSL === 'true';
const log = process.env.ENABLE_LOG === 'true';

// 一些设置
app.use(compression());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('X-Powered-By', 'NekoAPI');
  next();
});

// 时间
function time() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

// 定义 Log
morgan.token('time', time);
const logFormat = `[:time] :req[${process.env.IP_HEADER}] / :remote-addr - ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`;

// 判断开没开要写 Log
if (log) {
  const logsFolder = path.join(__dirname, 'logs');
  const LogStream = fs.createWriteStream(path.join(logsFolder, moment().format('YYYY-MM-DD HH-mm-ss') + '.log'), { flags: 'a' });
  if (!fs.existsSync(logsFolder)) {
    fs.mkdirSync(logsFolder);
  }
  app.use(morgan(logFormat, { stream: LogStream }));
  app.use(morgan(chalk.cyan(logFormat)));
} else {
  app.use(morgan(chalk.cyan(logFormat)));
}

// 载入路由
require('./Routes/router')(app);

// 开机
const serverType = ssl ? 'https' : 'http';

if (ssl && is443) {
  http.createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host}${req.url}`
    }).end();
  }).listen(80);
}

figlet("NekoAPI", function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    return;
  }
  console.log(data);
  console.log(`Cpoyright © 2021-2023 NyaStudio, LLC | Version ${version}`)
  console.log("-----------------------------------------");

  const server = ssl
    ? https.createServer({
        cert: fs.readFileSync(process.env.CERT_PATH),
        key: fs.readFileSync(process.env.CERT_KEY_PATH)
      }, app)
    : app;

  server.listen(port, host, () => {
    console.log(chalk.blue(`[${time()}] NekoAPI Running at ${host} port ${port}${ssl ? ' with SSL' : ''}`));
  });
});