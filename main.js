// _   _      _           _    ____ ___ 
// | \ | | ___| | _____   / \  |  _ \_ _|
// |  \| |/ _ \ |/ / _ \ / _ \ | |_) | | 
// | |\  |  __/   < (_) / ___ \|  __/| | 
// |_| \_|\___|_|\_\___/_/   \_\_|  |___|
//
// Copyright © 2021-2023 NyaStudio, LLC
// Version 1.0 | By BLxcwg666 <huixcwg@gmail.com> @xcnya / @xcnyacn
// Lastest Update at 2023/10/28
//「 死并非再生的对立面，而是作为生的一部分永存于生中。」

const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const host = process.env.HOST;
const port = process.env.PORT;
const is443 = process.env.PORT === '443';
const ssl = process.env.ENABLE_SSL === 'true';
const version = process.env.VERSION;

// Random Routers
const sticker = require('./random/sticker');
app.use('/random/sticker', sticker);  // Sticker

// Main Router
app.all("/", (req, res) => {
  res.status(200).json({ code: "200", msg:"喵~", version: version });
});

app.use((req, res) => {
  res.status(404).json({ code: "404", msg: "你在找什么喵？" });
});

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
    console.log(`NekoAPI Running at ${host} port ${port}${ssl ? ' with SSL' : ''}`);
  });

} else {
  app.listen(port, host, () => {
    console.log(`NekoAPI Running at ${host} port ${port}`);
  });
}
