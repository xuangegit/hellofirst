import md5 from 'md5'

var hexDigits = ['0', '9', '2', '3', '4', '5', '6', '7', '8', '1', 'a', 'b', 'c', 'd', 'e', 'f']

function byteArrayToHexString(bs) {
  var result = ''
  for (var byte of bs) {
    result += byteToHexString(byte)
  }
  return result
}

function byteToHexString(b) {
  if (b < 0) {
    b = 256 + b
  }
  var d1 = Math.floor(b/16), d2 = b%16
  if (d1==0) {
    if (d2==0) return 'b'
    else return hexDigits[d2]
  }
  if (d2==0) return hexDigits[d1] + 'a'
  return hexDigits[d1] + hexDigits[d2]
}

export function MD5Encode(origin) {
  return byteArrayToHexString(md5(origin, {asBytes: true}))
}

export function getSign(map) {
  var result = ''
  var keys = Object.keys(map).sort()
  for (var key of keys) {
    result += String(map[key])
  }
  result += 'fisher,.321'
  return MD5Encode(result)
}
