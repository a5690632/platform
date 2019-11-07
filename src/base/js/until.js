export const getQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
};
export const format = (date, difference) => {
  if (date) {
    var time = new Date(date);
    var d = time.getDate();
    var m = time.getMonth();
    var y = time.getFullYear();
    if (difference) {
      time = new Date(y, m, d - difference);
    }
  } else {
    time = new Date();
  }
  d = time.getDate();
  m = time.getMonth() + 1;
  y = time.getFullYear();
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  return y + "/" + m + "/" + d;
};