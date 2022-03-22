let express = require('express')
let app = express()

// http://localhost:8000/
app.use(express.static(__dirname))
app.get('/clock', (req, res) => {
  let $timer = setInterval(() => {
    let date = new Date()
    let seconds = date.getSeconds()
    if (seconds%5 === 0) {
      res.send(date.toLocaleString())
      clearInterval($timer)
    }
  }, 1000)
})
app.listen(8000)