var searchTerms; //The value entered into the search box.
var trackID; //The ID created in the getTrack function for use in the getLyrics function. 
var resultsSection = document.getElementById("results");

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

//To reset the page when results are displayed.
function resetPage() {
    resultsSection.innerHTML = "";
}

//getTrack is run when the search is for a song.
function getTrack() {
    resetPage();
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891",
                q_track: searchTerms,
                format: "jsonp",
                callback: "jsonp_callback",
                page_size: 100,
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
                resultsSection.innerHTML += `<thead>
                                                <tr>
                                                  <th scope="col">Track Name</th>
                                                  <th scope="col">Artist</th>
                                                  <th scope="col">Lyrics</th>
                                                </tr>
                                             </thead>`;
                trackResults.forEach(function(item) {
                    resultsSection.innerHTML += `<tbody>
                                                    <tr>
                                                        <td>${item.track.track_name}</td>
                                                        <td>${item.track.artist_name}</td>
                                                        <td>
                                                            <button class="btn btn-secondary btn-result" onclick="getLyrics(${item.track.track_id}, '${item.track.track_name}')">Click here for lyrics</button>
                                                            <button class="btn btn-secondary btn-result-mobile" onclick="getLyrics(${item.track.track_id}, ${item.track.track_name})">Lyrics</button>
                                                        </td>
                                                    </tr>
                                                </tbody>`;

                });


            },

        }

    );
}

//getArtist is run when the user has searched for an artist.
function getArtist() {
    resetPage();
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
                resultsSection.innerHTML += `<thead>
                                                <tr>
                                                  <th scope="col">Artist Name</th>
                                                  <th scope="col">Albums</th>
                                                </tr>
                                             </thead>`;
                artistResults.forEach(function(item) {
                    resultsSection.innerHTML += `<tbody>
                                                        <tr>
                                                        <td>${item.artist.artist_name}</td>
                                                        <td>
                                                            <button class="btn btn-secondary btn-result" onclick="getAlbumList(${item.artist.artist_id})">Click here for a list of albums</button>
                                                                <button class="btn btn-secondary btn-result-mobile" onclick="getAlbumList(${item.artist.artist_id})">Albums</button>
                                                        </td>
                                                    </tr>
                                                </tbody>`;

                });
                if (artistResults.length === 0) {
                    resetPage();
                    resultsSection.innerHTML += `<thead>
                                                    <tr>
                                                        <th scope="col">A problem has occurred</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Sorry, no results were found.</td>
                                                    </tr>
                                                </tbody>`;
                }

            },

        }

    );
}

//getLyrics is run when the user has selected the track they want lyrics for. 
function getLyrics(trackID, trackName) {
    resetPage();
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891", 
                track_id: trackID,
                format: "jsonp",
                callback: "jsonp_callback",

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
                    resultsSection.innerHTML += `<thead>
                                                <tr>
                                                  <th scope="col">A problem has occurred</th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                <tr>
                                                    <td>Sorry, there are no lyrics available for this song.</td>
                                                </tr>
                                             </tbody>`;
                    return;

                }
                resultsSection.innerHTML += `<thead>
                                                <tr>
                                                  <th scope="col">${trackName}</th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                <tr>
                                                    <td>${lyricResults}<br>${lyricCopyright}</td>
                                                </tr>
                                             </tbody>`;

            }
        }

    );
}

//getAlbumList is run when the user has selected an artist based on the results returned by getArtist
function getAlbumList(artistID) {
    resetPage();
    $.ajax({
            type: "GET",
            data: {
                apikey: "16099f064260947071709a4bc6421891",
                artist_id: artistID,
                format: "jsonp",
                callback: "jsonp_callback",
                page_size: 100,
                g_album_name: 1

            },
            url: "https://api.musixmatch.com/ws/1.1/artist.albums.get",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                var albumList = data.message.body.album_list;
                console.dir(albumList);
                resultsSection.innerHTML += `<thead>
                                                <tr>
                                                  <th scope="col">Album Name</th>
                                                  <th scope="col">Track List</th>
                                                </tr>
                                             </thead>`;
                albumList.forEach(function(item) {
                    resultsSection.innerHTML += `<tbody>
                                                    <tr>
                                                        <td>${item.album.album_name}</td>
                                                        <td>
                                                            <button class="btn btn-secondary btn-result" onclick="getTrackList(${item.album.album_id})">Click here for a list of tracks</button>
                                                            <button class="btn btn-secondary btn-result-mobile" onclick="getTrackList(${item.album.album_id})">Tracks</button>
                                                        </td>
                                                    </tr>
                                                </tbody>`;
                });





            }
        }

    );
}

//getTrackList is run when the user has selected an album based on the results returned by getAlbum
function getTrackList(albumID) {
    resetPage();
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
                resultsSection.innerHTML += `<thead>
                                                <tr>
                                                  <th scope="col">Track Name</th>
                                                  <th scope="col">Lyrics</th>
                                                </tr>
                                             </thead>`;
                trackResults.forEach(function(item) {
                    resultsSection.innerHTML += `<tbody>
                                                    <tr>
                                                        <td>${item.track.track_name}</td>
                                                        <td>
                                                            <button class="btn btn-secondary btn-result" onclick="getLyrics(${item.track.track_id}, '${item.track.track_name}')">Click here for lyrics</button>
                                                            <button class="btn btn-secondary btn-result-mobile" onclick="getLyrics(${item.track.track_id}, '${item.track.track_name}')">Lyrics</button>
                                                        </td>
                                                    </tr>
                                                </tbody>`;
                });


            }
        }

    );
}
