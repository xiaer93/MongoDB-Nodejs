/**
 * Created by xiaer on 2018/8/18.
 */
var sidebar = require('../helpers/sidebar');
var ImageModel = require('../models').Image

module.exports = {
    index: function(req, res) {
        var viewModel = {
            images: [
                /*            {
                 uniqueId: 1,
                 title: 'Sample Image 1',
                 description: '',
                 filename: '1.jpg',
                 views: 0,
                 likes: 0,
                 timestamp: Date.now
                 },
                 {
                 uniqueId: 2,
                 title: 'Sample Image 2',
                 description: '',
                 filename: '2.jpg',
                 views: 0,
                 likes: 0,
                 timestamp: Date.now
                 }*/
            ]
        };

        ImageModel.find({}, {}, {sort: {timestamp: -1}}, function (err, images) {
            if(err) throw err;

            viewModel.images = images;
            sidebar(viewModel, function (viewModel) {
                res.render('index', viewModel);
            })
        })
    }
};