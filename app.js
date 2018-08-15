/**
 * Created by xiaer on 2018/8/15.
 */
var MongoClient = require('mongodb').MongoClient

var connectUrl = 'mongodb://localhost:27017'
var sampleCollection = 'chapters'

var chapters = [
  {
    'Title': 'Snow Crash',
    'Author': 'Neal Stephenson'
  },
  {
    'Title': 'Snow Abc',
    'Author': 'Neal Blob'
  }
]

MongoClient.connect(connectUrl, function (err, db) {
  console.log('链接数据库成功...')

  var dbn = db.db('nodejs')
  var collection = dbn.collection(sampleCollection)
  collection.insert(chapters, function (err, res) {
    if (err) {
      console.log('保存数据失败...')
    } else {
      console.log('保存数据成功...')
    }
    db.close()
  })
})