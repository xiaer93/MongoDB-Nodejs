/**
 * Created by xiaer on 2018/8/18.
 */
$(function () {
    $('#like').on('click', function (e) {
        e.preventDefault()
        var imgId = $(this).data('id')

        $.post('/images/' + imgId + '/like').done(function (data) {
            $('#like-count').text(data.likes)
        })
    })
})