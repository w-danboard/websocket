let key = 'O/SldTn2Th7GfsD07IxrwQ=='
let accept = 'H8BlFmSUnXVpM4+scTXjZIwFjzs='
let CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
let crypto = require('crypto')

let result = crypto.createHash('sha1').update(key + CODE).digest('base64')
console.log(result)

// 进制本身是什么
console.log(0b1111 == 15)