
// md5加密升级
export function md5Up(val) {
  var arr = val.split('')
  var objArr = []
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 == 0) {
      var a1 = []
      a1.push(arr[i])
      a1.push(arr[i + 1])
      objArr.push(a1)
    }
  }
  for (let i = 0; i < objArr.length; i++) {
    if (objArr[i][0] == '0') {
      objArr[i].splice(0, 1)
    }
  }
  var str2 = ''
  for (let i = 0; i < objArr.length; i++) {
    str2 = str2 + objArr[i].join('')
  }
  var arr2 = []
  arr2 = str2.split('')
  for (let i = 0; i < arr2.length; i++) {
    if (arr2[i] == '1') {
      arr2[i] = '9'
    } else if (arr2[i] == '9') {
      arr2[i] = '1'
    } else {
    }
  }
  var str3 = arr2.join('')
  return str3
}
export function getRandom(range,type){

  let digital = Math.random()*range
  console.log('Math.floor(digital)',Math.floor(digital))
  if(type)
    return Math.floor(digital) // 0  -  range-1
  else 
    return Math.ceil(digital)  // 0  -  range 
}
//时间日期相关
export function getYestodayToCN(){
  var cur = new Date()
  var lastMonthDate = new Date(cur.getTime() -(24*3600*1000))
  return formatToCNMonth(lastMonthDate)
}
export function formatDate(d, format) {
  var o = {
    'M+': d.getMonth() + 1, // month
    'd+': d.getDate(), // day
    'h+': d.getHours(), // hour
    'H+': d.getHours(), // hour
    'm+': d.getMinutes(), // minute
    's+': d.getSeconds(), // second
  }
  //将连续的y转换成年的最后几位
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (d.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  //连续两个前面以0补全，只有一个不补
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}

export function formatToMonth(d) {
  return formatDate(d, 'yyyy-MM')
}

export function formatToDate(d) {
  return formatDate(d, 'yyyy-MM-dd')
}

export function formatToCNDate(d) {
  return formatDate(d, 'yyyy年MM月dd日')
}

export function formatToCNMonth(d) {
  return formatDate(d, 'MM月dd日')
}

export function formatToDatetime(d) {
  return formatDate(d, 'yyyy-MM-dd hh:mm:ss')
}

export function rangeValidator(f) {
  if (f.begDate && f.endDate && new Date(f.begDate) > new Date(f.endDate)) {
    vm.$message.error('开始日期不得大于结束日期')
    return false
  }
  return true
}


// 防止函数连续触发
export function debounce(name, callback, delay, ...args) {
  var interval = Date.now() - Number(sessionStorage['debounce_' + name] || 0)
  if (interval >= delay) {
    sessionStorage['debounce_' + name] = Date.now()
    callback(...args)
  }
}

// 将树前序遍历展开成数组
export function flatten(root, key) {
  var result = [key == null ? root : root[key]]
  if (root.children)
    root.children.forEach(c => {
      result = result.concat(flatten(c, key))
    })
  return result
}

//在对象指定处插入键值并返回为新对象
export function objectInsert(obj, place, key, val) {
  var result = {}, index = 0
  for (var i in obj) {
    if (index == place) result[key] = val
    result[i] = obj[i]
    index++
  }
  return result
}

export function number_format(number, decimals, dec_point, thousands_sep, flag) {
  /*
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数
  * dec_point：小数点符号
  * thousands_sep：千分位符号
  * flag: 不处理小数位
  * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.round(n * k) / k;
      };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if(flag) {
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
  }
  return s.join(dec);
}