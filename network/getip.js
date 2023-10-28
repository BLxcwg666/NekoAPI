//   ____      _   ___ ____  
//  / ___| ___| |_|_ _|  _ \ 
// | |  _ / _ \ __|| || |_) |
// | |_| |  __/ |_ | ||  __/ 
//  \____|\___|\__|___|_|    
//
// Copyright © 2021-2023 NyaStudio, LLC
// NekoAPI Network-IP | By BLxcwg666 <huixcwg@gmail.com> @xcnya / @xcnyacn
// Lastest Update at 2023/10/29 01:12
//「 想说什么就说，想做什么就做，我们不就是这么一直过来的吗？」

const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();

router.get("/", (req, res) => {
    const userAgent = req.headers["user-agent"];
    let clientIp = req.headers[process.env.IP_HEADER] || req.ip;

    if (userAgent && (userAgent.includes("curl") || userAgent.includes("wget"))) {
      res.send(clientIp);
    } else {
      res.status(200).json({ code:"200", msg: "OK", data: { IP: clientIp } });
    }
});

module.exports = router;
