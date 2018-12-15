Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //this分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
  //调用：

  //var time1 = new Date().Format("yyyy-MM-dd");
  //var time2 = new Date().Format("yyyy-MM-dd hh:mm");
  //var time3 = new Date().Format("yyyy-MM-dd hh:mm:ss");
}

Array.prototype.in_array = function(e) {
  for(i=0; i<this.length && this[i]!=e; i++);
  return !(i==this.length);
}

Array.prototype.shuffle = function() {
  let m = this.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [this[m], this[i]] = [this[i], this[m]]
  }
  return this;
}

String.prototype.myReplace=function(f,e){//把f替换成e
  var reg=new RegExp(f,"g"); //创建正则RegExp对象
  return this.replace(reg,e);
}

String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g, "");
}
