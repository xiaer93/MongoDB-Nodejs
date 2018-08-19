/**
 * Created by xiaer on 2018/8/18.
 */
module.exports = {
    popular: function() {
        var images = [
            {
                uniqueId: 1,
                title: 'Sample Image 1',
                description: '',
                filename: '1.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now()
            }
        ];
        return images;
    }
};