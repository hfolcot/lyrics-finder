# Lyrics Finder by Heather Olcot

Brief - To create a single page application that relies heavily on one or more APIs.

The API that I have chosen to use is the MusixMatch catalog of song lyrics, located 
at https://www.musixmatch.com/

Users who wish to look up the lyrics of a specific song can do so by using Lyric 
Finder.

The user can search by artist or by song and is returned a list of results through which 
they can navigate to find the lyrics of the song they are looking for.

The page is now live at https://hfolcot.github.io/lyrics-finder/

***Please note that the lyrics are not printed in full due to licensing***

## Functionality / Technologies

### General

The page uses Bootstrap 4.0.0 and makes use of its grid system and other styling.

The page uses the Nunito Sans and Corben fonts from Google Fonts, and also icons 
from FontAwesome.

My own further styling has been done within assets/css/main.css

The scripting makes use of JQuery 3.3.1.

The API used is https://api.musixmatch.com/ws/1.1. The data returned is in JSONP 
format and so a JQuery AJAX request was required to get the data.

### Logic

These are the each of the stages the app can be at - the following numbers will 
be used to describe at which [stage] each function is used and to which stage it 
leads.

There is also functionality within each stage to move back to the previous page, 
via either the Clear Results button or a Go Back button.

1. Main
2. Main > Song Results
3. Main > Song Results > Lyric Results
4. Main > Artist Results
5. Main > Artist Results > Album Results
6. Main > Artist Results > Album Results > Song Results
7. Main > Artist Results > Album Results > Song Results > Lyric Results

There are seven main functions used in Lyric Finder:

### checkRadio() [1]

This function is invoked as soon as the user has clicked the Search button. It checks 
which value of radio button is checked and runs the relevant function based on this.

### resetPage() [2, 3, 4, 5, 6, 7]

This function is invoked at the beginning of all the following functions in order 
to clear any data that may already be in the results container.

### getTrack() [1 > 2]

This function is invoked by checkRadio() if the Song radio button was checked when 
the user searched. The function makes an $.ajax request to https://api.musixmatch.com/ws/1.1/track.search 
with the value that the user entered into the search box as the parameter q_track.
If the request is successful, a variable trackResults is created which contains 
the returned list of tracks. These are sorted by popularity of the artist as based 
on Musixmatch's ratings system. Then for each item of this list, the name and artist 
are entered into the results container in index.html, along with a button which 
gives the user an option to view the lyrics of the selected song. This works by 
passing the track_id as a parameter into the getLyrics() function which is triggered 
on click. 

### getArtist() [1 > 4]

This function is invoked by checkRadio() if the Artist radio button was checked 
when the user searched. The function makes an $.ajax request to https://api.musixmatch.com/ws/1.1/artist.search 
with the value that the user entered into the search box as a parameter for q_artist.  
If the request is successful, a variable artistResults is created which contains 
the returned list of artists. These are sorted by popularity as based on Musixmatch's 
ratings system. Then for each item of this list, the artist is entered into the 
results container in index.html, along with a button which gives the user an option 
to view the albums by the selected artist. This works by passing the artist_id as 
a parameter into the getAlbumList() function which is triggered on click.


### getAlbumList() [4 > 5]

This function runs similarly to the previous two functions. The artist_id is passed 
into it from the getArtist() function and this is used to get the album data for 
that artist. It is then printed to the container element as a list containing the
name of each album and a button giving the option to view the track list for that 
album. This will run getTrackList() on click and will pass the album_id as a parameter
into that function.

### getTrackList() [5 > 6]

The album_id is passed into this function and used to make a request to https://api.musixmatch.com/ws/1.1/album.tracks.get
for the list of tracks on that album. This will then return the list of tracks with 
the option to view the lyrics, again with a button as in getTrack().

### returnLyrics() [2 > 3 AND 6 > 7]

This function is invoked when any button within a list of songs is clicked. The 
track ID of the selected song is passed through from the previous function. The 
function uses two separate ajax calls. The first is used to get data from the track.get 
in the API and plucks the track name from this so that it can be displayed as a title.
A second call is then made to matcher.lyrics.get to return the lyrics themselves. 
If there are no lyrics to return, a custom error message is displayed within the 
container element.

## Design

The layout of the page has been kept very basic to keep the methods obvious and 
simple. A dark background image has been used which is gentle on the eye and doesn't
draw the user's attention. The colour scheme tries to match this image as much as 
possible and was created with Coolors.co.
The data is returned in a table with appropriate headers.

## Testing

The JavaScript code was run on JSHint and returned no errors.
The HTML was run on the W3C Markup Validator and returned no errors.
The CSS was run on the W3C CSS Validator and returned no errors.

During user testing it was noted that not all songs in the MusixMatch database have
lyrics and so a custom error has been added for those which do not have a lyrics_body key
within the result.

assets/js/spec.js was created and run in order to check the functionality of resetPage();
this test was successful.
In order to ensure the test script was correct the function was edited to include 
text within the results container, at which point the test failed.

Whilst testing, there was an interesting issue encountered where no lyrics were 
being returned for any song containing double or single quote marks. On investigation 
it appeared that the issue was caused by the function trying to pass a song name 
into a new function (getLyrics, renamed during this process 
to returnLyrics), but when quotes were present in the song name, it 
was reading this as the end of the parameter and erroring because there was no closing 
parenthesis. This was resolved by editing getLyrics so that it retrieved the song 
name itself in a separate call rather than passing it through from the previous 
function.


Each stage of testing was re-done after any new functionality changes.

To be tested:

1. Main
2. Main > Song Results
3. Main > Song Results > Clear Results
4. Main > Song Results > Lyric Results
5. Main > Song Results > Lyric Results > Go Back
6. Main > Song Results > Lyric Results > Clear Results
7. Main > Artist Results
8. Main > Artist Results > Clear Results
9. Main > Artist Results > Album Results
10. Main > Artist Results > Album Results > Go Back
11. Main > Artist Results > Album Results > Clear Results
12. Main > Artist Results > Album Results > Song Results
13. Main > Artist Results > Album Results > Song Results > Go Back
14. Main > Artist Results > Album Results > Song Results > Clear Results
15. Main > Artist Results > Album Results > Song Results > Lyric Results
16. Main > Artist Results > Album Results > Song Results > Lyric Results > Go Back
17. Main > Artist Results > Album Results > Song Results > Lyric Results > Clear Results

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
8|X|X|X|X|X|
9|X|X|X|X|X|
10|X|X|X|X|X|
11|X|X|X|X|X|
12|X|X|X|X|X|
13|X|X|X|X|X|
14|X|X|X|X|X|
15|X|X|X|X|X|
16|X|X|X|X|X|
17|X|X|X|X|X|

The following is testing whether the display is working as expected.

Browser/Test | Opera | Firefox | Chrome | Edge | Safari
-----|-----|-----|-----|-----|-----
1|X|X|X|X|X|
2|X|X|X|X|X|
3|X|X|X|X|X|
4|X|X|X|X|X|
6|X|X|X|X|X|
7|X|X|X|X|X|
8|X|X|X|X|X|
9|X|X|X|X|X|
11|X|X|X|X|X|
12|X|X|X|X|X|
14|X|X|X|X|X|
15|X|X|X|X|X|
17|X|X|X|X|X|

An issue was noted on Microsoft Edge where the background image wasn't displaying 
correctly. This was due to the position of the script element within the HTML code.
Once it was moved to the end of the body rather than in the head the background 
image displayed correctly.

Another issue was found on iPhone where the background image was not remaining fixed 
and wouldn't scroll with the page, leading to the page 'running out' of background 
when a scrolling down a large amount of returned data. Research showed that this 
is a known issue with iOS. This was resolved by using a media query to set the 
background to repeat on smaller screens.


#### Responsiveness

Using Google Chrome developer tools to test how each stage of the application displays at different screen width.

X = Displaying as expected

Screen width/Page display|Galaxy S5|Pixel 2|Pixel 2XL|iPhone 5/SE|iPhone 6/7/8|iPhone 6/7/8 Plus|iPhone X|iPad|iPad Pro
-----|-----|-----|-----|-----|-----|-----|-----|-----|-----
1|X|X|X|X|X|X|X|X|X|
2|X|X|X|X|X|X|X|X|X|
3|X|X|X|X|X|X|X|X|X|
4|X|X|X|X|X|X|X|X|X|
6|X|X|X|X|X|X|X|X|X|
7|X|X|X|X|X|X|X|X|X|
8|X|X|X|X|X|X|X|X|X|
9|X|X|X|X|X|X|X|X|X|
11|X|X|X|X|X|X|X|X|X|
12|X|X|X|X|X|X|X|X|X|
14|X|X|X|X|X|X|X|X|X|
15|X|X|X|X|X|X|X|X|X|
17|X|X|X|X|X|X|X|X|X|


## Deployment

This project was built in Cloud9 and pushed to GitHub where it was then published 
on GitHub pages at https://hfolcot.github.io/lyrics-finder/