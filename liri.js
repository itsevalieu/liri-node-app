var keys = require("./keys.js");
var action = process.argv[2];
var searchKey = process.argv[3];

switch(action) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThisSong(searchKey);
	break;

	case "movie-this":
	movieThis(searchKey);
	break;

	case "do-what-it-says":
	doWhatItSays();
	break;
}

function myTweets(){
    var Twitter = require("twitter");

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret,
    });

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

function spotifyThisSong(query){
    var spotify = require('spotify'); 
    var song = query;

    if(song === undefined){
        song = "the+sign";
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log("====================================================");
        console.log("Song Name: " + data.tracks.items[5].name);
        console.log("Artist(s): " + data.tracks.items[5].artists[0].name);
        console.log("Album: " + data.tracks.items[5].album.name);
        console.log("Spotify Preview Link: " + data.tracks.items[5].preview_url +"\n");
    });
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
        data = data.split(",")
        action = data[0];
        searchKey = data[1];
        spotifyThisSong(searchKey);//send in parameter for song
    });
}
