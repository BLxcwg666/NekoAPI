// ____             _            
// |  _ \ ___  _   _| |_ ___ _ __ 
// | |_) / _ \| | | | __/ _ \ '__|
// |  _ < (_) | |_| | ||  __/ |   
// |_| \_\___/ \__,_|\__\___|_|   
//         
// Copyright © 2021-2023 NyaStudio, LLC
// NekoAPI Router | By BLxcwg666 <huixcwg@gmail.com> @xcnya / @xcnyacn
// Lastest Update at 2023/10/29 17:31
//「 要是追不上光，那就变成光吧。」

module.exports = function (app) {

  const express = require("express");
  const dotenv = require("dotenv").config();

  const version = "1.6";
  function time() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ') + " UTC";
  };

  // Main Route
  app.all("/", (req, res) => {
    res.status(200).json({ code: "200", msg:"API 运行正常喵~", version: version, time: time() });
  });

  // Random Routes
  const sticker = require('./random/sticker');
  app.use('/random/sticker', sticker);  // Sticker

  // Network Routes
  const ip = require("./network/getip");
  app.use("/network/getip", ip);  // Get IP

  // UnMatched Route
  app.use((req, res) => {
    res.status(404).json({ code: "404", msg: "你在找什么喵？" });
  });

}
