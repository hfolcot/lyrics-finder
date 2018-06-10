var searchTerms

function checkRadio() {
    searchTerms = document.getElementById("search").value;

    if ($("#artistRadioButton").is(":checked")) {
        getArtist();
    }
    else {
        getTrack();
    }
}

function getTrack() {
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891",
                q_artist: searchTerms,
                format: "jsonp",
                callback: "jsonp_callback",

            },

            url: "https://api.musixmatch.com/ws/1.1/track.search",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                console.log(data)

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }

    )
}

function getArtist() {
    var resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891",
                q_artist: searchTerms,
                format: "jsonp",
                callback: "jsonp_callback",
                page_size: 50

            },

            url: "https://api.musixmatch.com/ws/1.1/artist.search",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                var artistResults = data.message.body.artist_list;
                console.dir(artistResults);
                artistResults.forEach(function(item) {
                    resultsSection.innerHTML += `<p>${item.artist.artist_name}</p>`;
                });
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }

    )
}

/*function getLyrics() {
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891",
                q_track: searchTerms,
                q_artist: searchTerms,
                format: "jsonp",
                callback: "callback",

            },
            contentType: 'application/json',
            url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
            jsonpCallback: 'callback',
            success: function() {
                console.log(data)
            }
        }

    )
}
*/
