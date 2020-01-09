const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//替换URL中特殊字符
function replaceSpecialChar(str) {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/&#39;/g, '"');
  s = s.replace(/&quot;/g, '"https://m.jinbaoyuan168.com');
  return s;
}
function toPercent(point) {
  var str = Number(point * 100).toFixed(1);
  str += "%";
  return str;
}
 function numFloor(a) {
  return Math.floor(a * 100) / 100;
}
module.exports = {
  formatTime: formatTime,
  replaceSpecialChar: replaceSpecialChar,
  toPercent:toPercent,
  numFloor: numFloor
}
