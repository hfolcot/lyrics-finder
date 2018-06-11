var searchTerms; //The value entered into the search box.
var trackID; //The ID created in the getTrack function for use in the getLyrics function. 

//checkRadio is run when the user clicks on the Search button
function checkRadio() {
    searchTerms = document.getElementById("search").value;

    if ($("#artistRadioButton").is(":checked")) {
        getArtist();
    }
    else {
        getTrack();
    }
}

//getTrack is run when the search is for a song.
function getTrack() {
    var resultsSection = document.getElementById("results");
    resultsSection.innerHTML = ""; //clear the results div so that new results are not appended to the bottom of any current list
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
                                                        <button class="btn btn-primary btn-result-mobile" onclick="getLyrics(${item.track.track_id})">Lyrics</button>
                                                    </div>
                                                </div>`;
                });
            },

        }

    );
}

//getArtist is run when the user has searched for an artist.
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
                                                            <button class="btn btn-primary btn-result-mobile" onclick="getAlbumList(${item.artist.artist_id})">Albums</button>
                                                        </div>
                                                    </div>`;
                    });

                },

            }

        );
}

//getLyrics is run when the user has selected the track they want lyrics for. 
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
                try {
                    var lyricResults = data.message.body.lyrics.lyrics_body;
                    var lyricCopyright = data.message.body.lyrics.lyrics_copyright;
                }
                catch (err) {
                    resultsSection.innerHTML += `<div class="row justify-content-center">
                                                <div class="col-10 lyric-container">
                                                <p>Sorry, there are no lyrics available for this song.</p>
                                                </div>
                                             </div>`;
                                             return;
                    
                }
                resultsSection.innerHTML += `<div class="row justify-content-center">
                                                <div class="col-10 lyric-container">
                                                ${lyricResults}<br>${lyricCopyright}
                                                </div>
                                             </div>`;



            }
        }

    );
}

//getAlbumList is run when the user has selected an artist based on the results returned by getArtist
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
                                                        <button class="btn btn-primary btn-result-mobile" onclick="getTrackList(${item.album.album_id})">Tracks</button>
                                                    </div>
                                                </div>`;
                });




            }
        }

    );
}

//getTrackList is run when the user has selected an album based on the results returned by getAlbum
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
                                                        <button class="btn btn-primary btn-result-mobile" onclick="getLyrics(${item.track.track_id})">Lyrics</button>
                                                    </div>
                                                </div>`
                });


            }
        }

    );
}
