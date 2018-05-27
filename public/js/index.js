$(document).ready(() => {

    let classElements = document.getElementsByClassName("combination");
    $('x-star-rating').on('rate', function(event, payload) {
        const label = $(this).parents(".color-panel").children(".combination").children("label").text();
        const data = JSON.parse(label);
        data.score = payload / 4;

        $.ajax({
            type: 'POST',
            url: '/',
            data: data
        });
    });
});