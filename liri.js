// require("dotenv").config();

var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require("fs");

//requiring what 'key.js' is sharing
//the variable is equal to the object created in keys.js
// var keys = require('./keys');

var getArtistNames = function(artist) {
    return artist.name;
}
var getMeSpotify = function (songName) {

    var spotify = new Spotify(keys.spotifyKeys);

    spotify.search({type: 'track', query: songName}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        for(var i=0; i<songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(
                getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('*************************');
        }
    });

}
var getMyTweets = function() {
    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'TylerHunter06'};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log('');
                console.log(tweets[i].text);
            }
        }
    });
}


var getMeMovie = function(movieName) {
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }

    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=40e9cece";

    request(urlHit, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);

            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
        }
    });
};

var doWhatItSays = function() {
fs.readFile('random.txt', 'utf8', function (err, data) {

    if (err) throw err;

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
        pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
        pick(dataArr[0]);
    }
    });
};

var pick = function (caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case "movie-this":
            getMeMovie(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
        console.log('LIRI does not know that');
    }

}

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);

};

runThis(process.argv[2], process.argv[3]);