// ____             _            
// |  _ \ ___  _   _| |_ ___ _ __ 
// | |_) / _ \| | | | __/ _ \ '__|
// |  _ < (_) | |_| | ||  __/ |   
// |_| \_\___/ \__,_|\__\___|_|   
//         
// Copyright © 2021-2023 NyaStudio, LLC
// NekoAPI Router | By BLxcwg666 <huixcwg@gmail.com> @xcnya / @xcnyacn
// Lastest Update at 2023/10/30 01:31
//「 要是追不上光，那就变成光吧。」

module.exports = function (app) {

  const chalk = require("chalk");
  const express = require("express");
  const dotenv = require("dotenv").config();

  // Main Route
  app.all('/', (req, res) => {
    res.status(200).json({ code: "200", msg: "API 运行正常喵~", version: `${global.version}`, time: `${global.time()}` + ' CST' });
  });
  
  // Random Routes
  app.use('/random/sticker', require('./random/sticker'));  // Sticker
  
  // Network Routes
  app.use("/net/getip", require("./net/getip"));  // Get IP
  app.use("/net/getua", require("./net/getua"));  // Get User-Agent
  
  // UnMatched Route
  app.use((req, res) => {
    res.status(404).json({ code: "404", msg: "你在找什么喵？" });
  });
  
  // Error？
  app.use((err, req, res, next) => {
    console.log(chalk.red(`[${global.time()}] An error occurred:`, err));
    res.status(500).json({ code: "500", msg: "出错了呜呜呜~ 在运行过程中发生错误，请检查控制台日志喵~" });
  });

}
