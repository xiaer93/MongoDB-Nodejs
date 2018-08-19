
/**
 * Created by xiaer on 2018/8/18.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Account = new Schema({
    username: {type: String},
    date_created: {type: Date, default: Date.now()},
    visits: {type: Number, default: 0},
    active: {type: Boolean, default: false}
})

mongoose.connect('mongodb://localhost:27017/')
mongoose.connection.on('open', function () {
    console.log('Mongoose connected')
})

// 创建方法
Account.statics.findByVisit = function (min, max, callback) {
    this.find({visits: {$gt: min, $lte: max}}, callback)
}
// 创建虚拟属性
Account.virtual('status')
    .get(function () {
        return this.active ? 'yes' : 'no'
    })
    .set(function (flag) {
        this.active = (flag === 'yes')
    })

// 在集合Account中新建文档？？
var AccountModel = mongoose.model('Account', Account)
var newUser = new AccountModel({username: 'cjw'})

// mongooose会在save时检查数据是否满足条件；可以主动调用validate方法检查~
newUser.validate(function (err) {
    console.log(err)
})
newUser.save()

AccountModel.find({}, function (err, accounts) {
    console.log(accounts)
})
AccountModel.findByVisit(0, 1, function (err, accounts) {

})