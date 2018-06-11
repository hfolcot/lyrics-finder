# Lyrics Finder by Heather Olcot

Brief - To create a single page application that relies heavily on one or more APIs.

The API that I have chosen to use is the MusixMatch catalog of song lyrics, located 
at https://www.musixmatch.com/

Lyrics Finder is a search engine that allows the user to search by artist or song 
and then select the lyrics they wish to view based on the results.

The page is now live at https://hfolcot.github.io/lyrics-finder/

***Please note that the lyrics are not printed in full due to licensing***

## Functionality / Technologies

### General

The page links to Bootstrap 4.0.0 and makes use of its grid system and other styling.

The page uses the Nunito Sans font from Google Fonts.

My own further styling has been done within assets/css/styles.css

The scripting makes use of JQuery 3.3.1.

The API used is https://api.musixmatch.com/ws/1.1. The data returned is in JSONP 
format and so a JQuery AJAX request was required to get the data.

### Logic

There are six different functions used in Lyric Finder:

## checkRadio() 

This function is invoked as soon as the user has clicked the Search button. It checks 
which value of radio button is checked and runs the relevant function based on this.

## getTrack()

This function is invoked by checkRadio() if the Song radio button was checked when 
the user searched. The function makes an $.ajax request to https://api.musixmatch.com/ws/1.1/track.search 
with the value that the user entered into the search box as a parameter for q_track.
If the request is successful, a variable trackResults is created which contains 
the returned list of tracks. These are sorted by popularity of the artist as based 
on Musixmatch's ratings system. Then for each item of this list, the name and artist 
are entered into the results container in index.html, along with a button which 
gives the user an option to view the lyrics of the selected song. This works by 
passing the track_id as a parameter into the getLyrics() function which is triggered 
on click. 

## getArtist()

This function is invoked by checkRadio() if the Artist radio button was checked 
when the user searched. The function makes an $.ajax request to https://api.musixmatch.com/ws/1.1/artist.search 
with the value that the user entered into the search box as a parameter for q_artist.  
If the request is successful, a variable artistResults is created which contains 
the returned list of artists. These are sorted by popularity as based on Musixmatch's 
ratings system. Then for each item of this list, the artist is entered into the 
results container in index.html, along with a button which gives the user an option 
to view the albums by the selected artist. This works by passing the artist_id as 
a parameter into the getAlbumList() function which is triggered on click.

## getLyrics()

This function is invoked when any button within a list of songs is clicked. The 
track_id of the selected song is passed into the function to be used in the $.ajax
request to https://api.musixmatch.com/ws/1.1/matcher.lyrics.get. The function will 
check that there are lyrics to return and if so, they are added to the html within 
the container element. If there are no lyrics to return, an error message is displayed 
within the container element.

## getAlbumList()

This function runs similarly to the previous three functions. The artist_id is passed 
into it from the getArtist() function and this is used to get the album data for 
that artist. It is then printed to the container element as a list containing the
name of each album and a button giving the option to view the track list for that 
album. This will run getTrackList() on click and will pass the album_id as a parameter
into that function.

## getTrackList()

The album_id is passed into this function and used to make a request to https://api.musixmatch.com/ws/1.1/album.tracks.get
for the list of tracks on that album. This will then return the list of tracks with 
the option to view the lyrics, again with a button as in getTrack().



## Testing

To be tested:

1. Main
2. Main > Song Results
3. Main > Song Results > Lyric Results
4. Main > Artist Results
5. Main > Artist Results > Album Results
6. Main > Artist Results > Album Results > Song Results
7. Main > Artist Results > Album Results > Song Results > Lyric Results

(X = Functioning as expected)
(O = Not functioning as expected)

The following is testing whether the code is working as expected.

Browser/Test | Opera | Firefox | Chrome | Edge | Safari
-----|-----|-----|-----|-----|-----
1|X|X|X|X|X|
2|X|X|X|X|X|
3|X|X|X|X|X|
4|X|X|X|X|X|
5|X|X|X|X|X|
6|X|X|X|X|X|
7|X|X|X|X|X|

The following is testing whether the display is working as expected.

Browser/Test | Opera | Firefox | Chrome | Edge | Safari
-----|-----|-----|-----|-----|-----
1|X|X|X|O*|X|
2|X|X|X|X|X|
3|X|X|X|X|X|
4|X|X|X|X|X|
5|X|X|X|X|X|
6|X|X|X|X|X|
7|X|X|X|X|X|

*The background image is not displaying correctly - research has shown that this 
is a known issue with fixed position background images on Edge and will be fixed in a future build.

#### Responsiveness

Using Google Chrome developer tools to test each stage of the application at different screen width.

Screen width/Page display|Galaxy S5|Pixel 2|Pixel 2XL|iPhone 5/SE|iPhone 6/7/8|iPhone 6/7/8 Plus|iPhone X|iPad|iPad Pro
-----|-----|-----|-----|-----|-----|-----|-----|-----|-----
1|X|X|X|X|X|X|X|X|X|
2|X|X|X|X|X|X|X|X|X|
3|X|X|X|X|X|X|X|X|X|
4|X|X|X|X|X|X|X|X|X|
5|X|X|X|X|X|X|X|X|X|
6|X|X|X|X|X|X|X|X|X|
7|X|X|X|X|X|X|X|X|X|