//   ____      _   _   _   _    
//  / ___| ___| |_| | | | / \   
// | |  _ / _ \ __| | | |/ _ \  
// | |_| |  __/ |_| |_| / ___ \ 
//  \____|\___|\__|\___/_/   \_\
//
// Copyright © 2021-2023 NyaStudio, LLC
// NekoAPI Network-UA | By BLxcwg666 <huixcwg@gmail.com> @xcnya / @xcnyacn
// Lastest Update at 2023/11/4 01:47
//「 纵是年少风流可入画，却也自成风骨难笔拓。」

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const userAgent = req.headers["user-agent"];
    if (userAgent && (userAgent.includes("curl") || userAgent.includes("wget"))) {
      res.send(userAgent);
    } else {
      res.status(200).json({ code:"200", msg: "OK", data: { "User-Agent": userAgent } });
    }
});

module.exports = router;