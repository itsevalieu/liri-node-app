var keys = require("./keys.js");
var action = process.argv[2];
var movie = process.argv[3];

var Twitter = require("twitter");
var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});

switch(action) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThisSong();
	break;

	case "movie-this":
	movieThis(movie);
	break;

	case "do-what-it-says":
	doWhatItSays();
	break;
}

function myTweets(){
	//* This will show your last 20 tweets and when they were created at in your terminal/bash window.
	var params = {screen_name: "itsevalieu", count: 20};
    client.get("statuses/user_timeline", params, function(error, tweet, response) {
        if (!error) {
            for(var i = 0; i < 20; i++){
                console.log("====================================================");
                console.log((i+1)+ ". " + "Created at: " + tweet[i].created_at + "\nTweet: " + tweet[i].text + "\n");
            }
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


function movieThis(movie){
    var request = require("request");
    var title = movie;
    if(title === undefined){
        title = "mr+nobody";
    }
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
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
    var fs = require ("fs");
    
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log("Error! Something went wrong!");
        }
        console.log(data);
        spotifyThisSong();//send in parameter for song
    });
/*
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.

*/
}
