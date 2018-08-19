/**
 * Created by xiaer on 2018/8/18.
 */
var Stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments');

module.exports = function(viewModel, callback){
    viewModel.sidebar = {
        stats: Stats(),
        popular: Images.popular(),
        comments: Comments.newest()
    };
    callback(viewModel);
};