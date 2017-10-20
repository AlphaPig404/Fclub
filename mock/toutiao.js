const md5 = require('md5') 

export function getHoney(){
    var t = Math.floor((new Date).getTime() / 1e3),
      e = t.toString(16).toUpperCase(),
      i = md5(t).toString().toUpperCase();
    if (8 != e.length) return {
      as: "479BB4B7254C150",
      cp: "7E0AC8874BB0985"
    };
    for (var a = i.slice(0, 5), n = i.slice(-5), o = "", l = 0; 5 > l; l++) o += a[l] + e[l];
    for (var r = "", s = 0; 5 > s; s++) r += e[s + 3] + n[s];
    return {
      as: "A1" + o + e.slice(-3),
      cp: e.slice(0, 3) + r + "E1"
    }
  }
