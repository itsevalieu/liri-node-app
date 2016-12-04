var keys = require("./keys.js");
var action = process.argv[2];

var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});

var spotify = require('spotify'); 
var song = "dancing in the moonlight";
spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    // Do something with 'data' 
    console.log(data);
});

/*
switch(action) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThisSong();
	break;

	case "movie-this":
	movieThis();
	break;

	case "do-what-it-says":
	doWhatItSays();
	break;
}
*/
function myTweets(){
	//* This will show your last 20 tweets and when they were created at in your terminal/bash window.
	var params = {screen_name: "itsevalieu", count: 3};

    client.get("statuses/user_timeline", params, function(error, tweet, response) {
        if (!error) {
            console.log(tweet);
            console.log(tweet[0].text);
            console.log(tweet[0].created_at);
            console.log(tweet[1].text);
            console.log(tweet[1].created_at);
        }
    });
}

function spotifyThisSong(){
/* 
*This will show the following information about the song in your terminal/bash window
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

* if no song is provided then your program will default to
    * "The Sign" by Ace of Base
*/
}

function movieThis(){
/*
* This will output the following information to your terminal/bash window:

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.

* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    * If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
    * It's on Netflix!

*/
}
function doWhatItSays(){
/*
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.

*/
}
