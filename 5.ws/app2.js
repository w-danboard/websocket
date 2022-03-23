/**
 * GET ws://localhost:8888/ HTTP/1.1
 * Host: localhost:8888
 * Connection: Upgrade
 * Upgrade: websocket
 * Sec-WebSocket-Version: 13
 * Sec-WebSocket-Key: O/SldTn2Th7GfsD07IxrwQ==
 */

/**
 * HTTP/1.1 101 Switching Protocols
 * Upgrade: websocket
 * Connection: Upgrade
 * Sec-WebSocket-Accept: H8BlFmSUnXVpM4+scTXjZIwFjzs=
 */

let net = require('net')
let CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
let crypto = require('crypto')

let server = net.createServer(function (socket) {
  // once来自于EventEmitter on once 只执行一次
  socket.once('data', function (data) {
    data = data.toString()
    if (data.match(/Connection: Upgrade/)) {
      let rows = data.split('\r\n')
      rows = rows.slice(1, -2)
      let headers = {}
      rows.reduce((memo, item) => {
        let [key, value] = item.split(': ')
        memo[key] = value
        return memo
      }, headers)
      if (headers['Sec-WebSocket-Version'] == '13') {
        let secWebSocketKey = headers['Sec-WebSocket-Key']
        let secWebSocketAccept = crypto.createHash('sha1').update(secWebSocketKey + CODE).digest('base64')
        let response = [
          'HTTP/1.1 101 Switching Protocols',
          'Upgrade: websocket',
          'Connection: Upgrade',
          `Sec-WebSocket-Accept: ${secWebSocketAccept}`,
          '\r\n'
        ].join('\r\n')
        socket.write(response)
        // 后面所有的格式都是基于websocket协议的
        socket.on('data', function (buffers) {
          let fin = buffers[0] & 0b10000000 == 0b10000000 // 结束位是true还是false
          let opcode = buffers[0] & 0b00001111 // 操作码
          console.log('opcode', opcode)
          let isMask = buffers[1] & 0b10000000 == 0b10000000 // 是否进行了掩码
          let payloadLength = buffers[1] & 0b01111111 // 后七位全是1
          let mask = buffers.slice(2, 6) // 掩码键
          let payload = buffers.slice(6) // 携带的真实数据
          unmask(payload, mask) // 对数据进行反掩码
          // payload = [h, e, l, l, o]
          let response = Buffer.alloc(2 + payloadLength)
          response[0] = 0b10001111 & opcode
          response[1] = payloadLength
          payload.copy(response, 2)
          console.log(response)
          socket.write(response)
        })
      }
    }
  })
})

function unmask (payload, mask) {
  for (let i = 0; i < payload.length; i++) {
    payload[i] ^= mask[i&3]
  }
}

server.listen(9999)