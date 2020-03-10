$(document).ready(function() {
    var images = $('img[data-src]');

    images.each(function() {
        var image = $(this);

        image
            .load(function() {
                image.removeAttr('data-src');
            })
            .attr('src', image.attr('data-src'));
    });
});