//Search bar Handler
$(function(){
    let searchField = $('#query');
    let icon = $('#search-btn');

    //Focus Event Handler
    $(searchField).on('focus', function(){
        $(this).animate({
            width:'100%'
        },400);
        $(icon).animate({
            right:'10px'
        }, 400)
    });

    //Blur Event Handler
    $(searchField).on('blur', function(){
       if (searchField.val() === '') {
           $(searchField).animate({
               width:'45%'
           }, 400, function(){});
           $(icon).animate({
            right:'360px'
        }, 400)
       }
    });

    $('#search-form').submit(function(e){
        e.preventDefault();
    })
})

function search() {
    //Clear Results
    $('#results').html('');
    $('#buttons').html('');

    //Get Form Input
    q = $('#query').val();

    //Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: q,
            type:'video',
            key: 'AIzaSyAzZWr7dqf6HAMoZItSvMGNG38v8A3C5oM'},
            function (data) {
                let nextPageToken = data.nextPageToken;
                let previousPageToken = data.previousPageToken;

                console.log(data);

                $.each(data.items, function (i, item) {
                    let output = getOutput(item);

                    //Display Results
                    $('#results').append(output);
                })

            }
    );
}