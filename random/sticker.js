// ____  _   _      _             
// / ___|| |_(_) ___| | _____ _ __ 
// \___ \| __| |/ __| |/ / _ \ '__|
//  ___) | |_| | (__|   <  __/ |   
// |____/ \__|_|\___|_|\_\___|_|   
// 
// Copyright © 2021-2023 NyaStudio, LLC
// Version 1.0 | By BLxcwg666 <huixcwg@gmail.com> @xcnya / @xcnyacn
// Lastest Update at 2023/10/28
//「 死并非再生的对立面，而是作为生的一部分永存于生中。」

const express = require("express");
const router = express.Router();

function getrandom() {
  const min = 0;
  const max = 31;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random.toString().padStart(3, '0');
}

router.get('/', (req, res) => {
  const Num = getrandom();
  res.redirect(302, `https://cdn.xcnya.cn/Basic/stickers/${Num}.webp`);
});

module.exports = router;