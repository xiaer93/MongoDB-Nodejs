/**
 * Created by xiaer on 2018/8/15.
 */
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

MongoClient.connect(url, function (err, db) {
  if(err) {
     console.log(err)
  } else {
    console.log('数据库已经连接...')
    var dbNode = db.db('nodejs')
    var myObj = {
      name: '菜鸟教程',
      url: 'www.baidu.com'
    }

    dbNode.collection("site"). find({},function (err, res) {
      if(err) throw err

      console.log(res)
      db.close()
    })
  }

  db.close()
})