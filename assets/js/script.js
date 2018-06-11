var searchTerms;
var trackID;

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
    var resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891",
                q_track: searchTerms,
                format: "jsonp",
                callback: "jsonp_callback",
                page_size: 50,
                s_artist_rating: "DESC",

            },

            url: "https://api.musixmatch.com/ws/1.1/track.search",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                var trackResults = data.message.body.track_list;
                console.dir(trackResults);
                trackResults.forEach(function(item) {
                    console.log(trackID);
                    resultsSection.innerHTML += `<div class="row justify-content-center">
                                                    <div class="col-4 result-container">
                                                        <p>${item.track.track_name}</p>
                                                    </div>
                                                    <div class="col-4 result-container">
                                                        <p>${item.track.artist_name}</p>
                                                    </div>
                                                    <div class="col-3 result-container">
                                                        <button class="btn btn-primary btn-result" onclick="getLyrics(${item.track.track_id})">Click here for lyrics</button>
                                                    </div>
                                                </div>`;
                });
            },

        }

    );
}

function getArtist() {
    var resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    trackID =
        $.ajax({
                type: "GET",
                data: {
                    apikey: "16099f064260947071709a4bc6421891",
                    q_artist: searchTerms,
                    format: "jsonp",
                    callback: "jsonp_callback",
                    page_size: 50,
                    s_artist_rating: "DESC",

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
                        resultsSection.innerHTML += `<div class="row justify-content-center">
                                                        <div class="col-4 result-container">
                                                            <p>${item.artist.artist_name}</p>
                                                        </div>
                                                        <div class="col-4 result-container">
                                                            <button class="btn btn-primary btn-result" onclick="getAlbumList(${item.artist.artist_id})">Click here for a list of albums</button>
                                                        </div>
                                                    </div>`;
                    });

                },
                
            }

        );
}

function getLyrics(trackID) {
    var resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891",
                track_id: trackID,
                format: "jsonp",
                callback: "jsonp_callback",
                page_size: 50,

            },
            url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                var lyricResults = data.message.body.lyrics.lyrics_body;
                console.dir(lyricResults);
                resultsSection.innerHTML += `<div class="row justify-content-center">
                                                <div class="col-10 lyric-container">
                                                ${lyricResults}
                                                </div>
                                             </div>`;



            }
        }

    );
}

function getAlbumList(artistID) {
    var resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891",
                artist_id: artistID,
                format: "jsonp",
                callback: "jsonp_callback",
                page_size: 50,

            },
            url: "https://api.musixmatch.com/ws/1.1/artist.albums.get",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                var albumList = data.message.body.album_list;
                console.dir(albumList);
                albumList.forEach(function(item) {
                    resultsSection.innerHTML += `<div class="row justify-content-center">
                                                    <div class="col-4 result-container">
                                                        <p>${item.album.album_name}</p>
                                                    </div>
                                                    <div class="col-4 result-container">
                                                        <button class="btn btn-primary btn-result" onclick="getTrackList(${item.album.album_id})">Click here for a list of tracks</button>
                                                    </div>
                                                </div>`;
                });




            }
        }

    );
}

function getTrackList(albumID) {
    var resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891",
                album_id: albumID,
                format: "jsonp",
                callback: "jsonp_callback",
                page_size: 50,

            },
            url: "https://api.musixmatch.com/ws/1.1/album.tracks.get",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                var trackResults = data.message.body.track_list;
                console.dir(trackResults);
                trackResults.forEach(function(item) {
                    resultsSection.innerHTML += `<div class="row justify-content-center">
                                                    <div class="col-4 result-container">
                                                        <p>${item.track.track_name}</p>
                                                    </div>
                                                    <div class="col-4 result-container">
                                                        <button class="btn btn-primary btn-result" onclick="getLyrics(${item.track.track_id})">Click here for lyrics</button>
                                                    </div>
                                                </div>`
                });


            }
        }

    );
}
