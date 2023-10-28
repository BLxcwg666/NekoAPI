// _   _      _           _    ____ ___ 
// | \ | | ___| | _____   / \  |  _ \_ _|
// |  \| |/ _ \ |/ / _ \ / _ \ | |_) | | 
// | |\  |  __/   < (_) / ___ \|  __/| | 
// |_| \_|\___|_|\_\___/_/   \_\_|  |___|
//
// Copyright © 2021-2023 NyaStudio, LLC
// Version 1.4 | By BLxcwg666 <huixcwg@gmail.com> @xcnya / @xcnyacn
// Lastest Update at 2023/10/29 02:16
//「 想说什么就说，想做什么就做，我们不就是这么一直过来的吗？」

const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const morgan = require('morgan');
const moment = require('moment');
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const host = process.env.HOST;
const port = process.env.PORT;
const is443 = process.env.PORT === '443';
const ssl = process.env.ENABLE_SSL === 'true';

// 创建 Logs 文件夹
const logsFolder = path.join(__dirname, 'logs');
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}

// 时间
function time() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

// 写 Log
morgan.token('time', time);
const logFormat = `[:time] :req[${process.env.IP_HEADER}] / :remote-addr - ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`;
const LogStream = fs.createWriteStream(path.join(logsFolder, moment().format('YYYY-MM-DD HH-mm-ss') + '.log'), { flags: 'a' });
app.use(morgan(logFormat, { stream: LogStream }));
app.use(morgan(logFormat));

// 载入路由
require('./router')(app);

// 开机
if (ssl) {
  const sslConfig = {
    cert: fs.readFileSync(process.env.CERT_PATH),
    key: fs.readFileSync(process.env.CERT_KEY_PATH)
  };

  if (is443) {
    http.createServer((req, res) => {
      res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`
      }).end();
    }).listen(80);
  }

  https.createServer(sslConfig, app).listen(port, host, () => {
    console.log(`[${time()}] NekoAPI Running at ${host} port ${port}${ssl ? ' with SSL' : ''}`);
  });

} else {
  app.listen(port, host, () => {
    console.log(`[${time()}] NekoAPI Running at ${host} port ${port}`);
  });
}
