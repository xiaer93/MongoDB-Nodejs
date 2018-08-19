/**
 * Created by xiaer on 2018/8/19.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    json = require('./movies.json'),
    app = express();


// form-data/x-www-urlencoded如何区别解析？
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var router = new express.Router()

router.get('/test', function (req, res) {
    var data = {
        name: 'abc'
    }
    res.json(data)
})

// get方法---获取数据
router.get('/', function (req, res) {
    res.json(json)
})
// post方法---插入数据
router.post('/', function (req, res) {
    console.log(req.body)
    if(req.body.Id && req.body.Title) {
        json.push(req.body)
        res.json(json)
    } else {
        res.json(500, {error: 'The was an error!'})
    }
})
// put方法---更新数据
router.put('/', function (req, res) {
    if(req.body.Id && req.body.Title) {
        _.each(json, function (elem) {
            if(elem.Id === req.body.Id) {
                elem.Title = req.body.Title
            }
        })
        res.json(json)
    } else {
        res.json(500, {error: 'The was an error!'})
    }
})
// delete方法---删除数据
router.delete('/:id', function (req, res) {
    var indexToDel = -1
    _.each(json, function (ele, index) {
        if(ele.Id === req.params.id) {
            indexToDel = index
        }
    })
    if(-indexToDel) {
        json.splice(indexToDel, 1)
    }
    res.json(json)
})

app.use('/', router)

var server = app.listen(3000, function () {
    console.log('server up: http://localhost:3000')
})