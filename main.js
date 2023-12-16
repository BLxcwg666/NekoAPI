// _   _      _           _    ____ ___ 
// | \ | | ___| | _____   / \  |  _ \_ _|
// |  \| |/ _ \ |/ / _ \ / _ \ | |_) | | 
// | |\  |  __/   < (_) / ___ \|  __/| | 
// |_| \_|\___|_|\_\___/_/   \_\_|  |___|
//
// Copyright © 2021-2023 NyaStudio, LLC
// Version 2.2 | By BLxcwg666 <huixcwg@gmail.com> @xcnya / @xcnyacn
// Lastest Update at 2023/11/4 02:02
//「 想说什么就说，想做什么就做，我们不就是这么一直过来的吗？」

const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const chalk = require("chalk");
const figlet = require("figlet");
const morgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv").config();
const moment = require('moment-timezone');
const compression = require("compression");

global.version = "2.3";
global.time = function() {
    return moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}

const app = express();
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

// 定义 Log
morgan.token('time', global.time);
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
app.all('/ping', (req, res) => {
  res.status(200).json({ code: "200", msg: "Pong!" });
});

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
  console.log(`Cpoyright © 2021-2023 NyaStudio, LLC | Version ${global.version}`)
  console.log("---------------------------------------------------------");

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