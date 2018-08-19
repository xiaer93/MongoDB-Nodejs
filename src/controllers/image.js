/**
 * Created by xiaer on 2018/8/18.
 */
var fs = require('fs'),
    path = require('path');
var sidebar = require('../helpers/sidebar');
var Models = require('../models')



module.exports = {
    index: function(req, res) {
        var viewModel = {
            image:{
                // uniqueId: 1,
                // title: 'Sample Image 1',
                // description: '',
                // filename: '1.jpg',
                // views: 0,
                // likes: 0,
                // timestamp: Date.now
            },
            comments: [
                // {
                //     image_id: 1,
                //     email: 'test@testing.com',
                //     name: 'Test Tester',
                //     gravatar: 'http://lorempixel.com/75/75/animals/1',
                //     comment: 'This is a test comment...',
                //     timestamp: Date.now()
                // },
                // {
                //     image_id: 1,
                //     email: 'test@testing.com',
                //     name: 'Test Tester',
                //     gravatar: 'http://lorempixel.com/75/75/animals/2',
                //     comment: 'Another followup comment!',
                //     timestamp: Date.now()
                // }
            ]
        }
        Models.Image.findOne({'filename': {$regex: req.params.image_id}}, function (err, image) {
            if(err) throw err;

            if(image) {
                image.views += 1
                viewModel.image = image
                image.save()

                Models.Comment.find({image_id: image._id}, {}, {sort: {'timestamp': 1}}, function(err, comments) {
                    if(err) throw err;

                    viewModel.comments = comments
                    sidebar(viewModel, function (viewModel) {
                        res.render('image', viewModel);
                    })
                })
            } else {
                res.redirect('/')
            }
        })
    },
    create: function(req, res) {
        // res.send('The image:create POST controller');
        // res.redirect('/images/1')
        saveImage()

        function saveImage() {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';
            for(var i=0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random() *
                    possible.length));
            }

            Models.Image.find({filename: imgUrl}, function (err, images) {
                if(images.length > 0) {

                } else {
                    console.log(images)

                    var fileTmp = req.files[0]
                    var tempPath = fileTmp.path,
                        ext = path.extname(fileTmp.originalname).toLowerCase(),
                        targetPath = path.resolve('./public/upload/' + imgUrl + ext);
                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ===
                        '.gif') {
                        fs.rename(tempPath, targetPath, function(err) {
                            if (err) throw err;
                            res.redirect('/images/' + imgUrl);
                        });

                        var newImg = new Models.Image({
                            title: req.body.title,
                            filename: imgUrl + ext,
                            description: req.body.description
                        })
                        newImg.save(function (err, image) {
                            res.redirect('/images/' + imgUrl.uniqueId)
                        })
                    } else {
                        fs.unlink(tempPath, function () {
                            if (err) throw err;
                            res.json(500, {error: 'Only image files are allowed.'});
                        });
                    }
                }
            })

        }
    },
    like: function(req, res) {
        // res.json({likes: 9})
        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function (err, image) {
            if(!err && image) {
                image.likes += 1
                image.save()

                if(err) {
                    res.json(err)
                } else {
                    res.json({likes: image.likes})
                }
            }
        })
    },
    comment: function(req, res) {
        // res.send('The image:comment POST controller');
        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function (err, image) {
            if(!err && image) {
                console.log(req.body)
                var newComment = new Models.Comment(req.body)
                newComment.image_id = image._id
                newComment.save(function (err) {
                    if(err) throw err;

                    res.redirect(('/images/' + image.uniqueId + '#'))
                })
            } else {
                res.redirect('/')
            }
        })
    }
};