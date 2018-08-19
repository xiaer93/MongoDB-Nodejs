var express = require('express'),
    config = require('./server/configure'),
    app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/app')
mongoose.connection.on('open', function () {
    console.log('Mongoose connected.')
})

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');

app = config(app);

// app.get('/', function(req, res){
// res.send('Hello World');
// });

var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});