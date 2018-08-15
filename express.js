/**
 * Created by xiaer on 2018/8/15.
 */
var express = require('express')

var app = express()
app.get('/', function (req, res) {
  res.send('hello world')
})
app.listen(3000)