require("dotenv").config();

//requiring what 'key.js' is sharing
//the variable is equal to the object created in keys.js
var keys = require('./keys');

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.id,
    secret: keys.secret
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    var tracks = data.tracks.items; //Array of tracks --each track is an object

    for (var i = 0; i < tracks.length; i++ ) {
        console.log(tracks[i].preview_url);
    }
});

