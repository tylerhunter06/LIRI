//sharing this value with any object

exports.spotifyKeys = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

var twitterKeys = {

}

module.exports = {
    spotify: spotifyKeys,
    twitter: twitterKeys
}