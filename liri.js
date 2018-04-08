//dependencies
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
require("dotenv").config();
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//grab user's task request
var task = process.argv[2];

//when user asks for tweets
if (task === "my-tweets") {
    client.get("statuses/user_timeline", function (error, tweets, response) {
        if (error) {
            return console.log(error);
        } else {
            for (var i = 0; i < 20; i++) {
                console.log(i + 1 + ". " + tweets[i].text);
            }
        }
    })
//when user asks for spotify
} else if (task === "spotify-this-song") {
    //holds each command line argument
    var songArr = [];
    //holds converted song name array as string
    var songStr = "";
    //convert song name into one string
    for (var i = 3; i < process.argv.length; i++) {
        songArr.push(process.argv[i]);
    }
    songStr = songArr.join(" ");
    //spotify api request
    spotify.search({
        type: "track",
        query: songStr,
        limit: 1
    }, function (error, data) {
        //error handling
        if (error) {
            return console.log(error);
        } else {
            //print info of song found
            if (data.tracks.total !== 0) {
                var songInfo = data.tracks.items[0];
                // console.log(songInfo);
                console.log("\nArtist: " + songInfo.artists[0].name);
                console.log("Song: " + songInfo.name);
                console.log("Album: " + songInfo.album.name);
                console.log("Link: " + songInfo.external_urls.spotify);
            }
            //if no songs are found
            else {
                console.log("\nArtist: Ace of Base");
                console.log("Song: The Sign");
                console.log("Album: The Sign (US Album) [Remastered]");
                console.log("Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
            }
        }
    })

//when user asks for movie info
} else if (task === "movie-this") {


//print from random.txt
} else if (task === "do-what-it-says") {


//user's input is incorrect, show error
} else {
    console.log("\nERROR - Command not found\n");
    console.log("AVAILABLE COMMANDS:\n");
    console.log("'my-tweets'");
    console.log("'spotify-this-song'");
    console.log("'movie-this'");
    console.log("'do-what-it-says'\n");
    console.log("Ex. 'node liri spotify-this-song Welcome to the Jungle'\n");
}