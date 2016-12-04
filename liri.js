var keys = require("./keys.js");
var action = process.argv[2];

var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
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
	var params = {screen_name: "itsevalieu", count: 20};

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
spotify.search({ type: 'artist', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    // Do something with 'data' 
    console.log(data);
});
*/
}


function movieThis(){
    var request = require('request');
    var movieTitle = "Mr+Nobody";
    request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var str = JSON.parse(body);
            console.log("Title: " + str.Title);
            console.log("Year: " + str.Year);
            console.log("IMDB Rated: " + str.Rated);
            console.log("Country: " + str.Country);
            console.log("Language: " + str.Language);
            console.log("Plot: " + str.Plot);
            console.log("Actors: " + str.Actors);
            console.log("Rotten Tomatoes Rating: " + str.tomatoRating);
            console.log("Rotten Tomatoes URL: " + str.tomatoURL);
        }
    });
}
function doWhatItSays(){
/*
Var fs = require ('fs`);
fs.readFile('/etc/passwd', (err, data) => {
if (err) throw err;
console.log(data);
});
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.

*/
}
