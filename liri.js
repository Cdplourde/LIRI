//******DEPENDENCIES & GLOBAL VARIABLES******
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
require("dotenv").config();
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require("request");
var fs = require('fs');

//grab user's task request
var task = process.argv[2];
//holds each command line argument
var arr = [];
//holds converted song name array as string
var str = "";

//******FUNCTIONS******

//turn argument into one string
function arrToString() {
    //convert song name into one string
    for (var i = 3; i < process.argv.length; i++) {
        arr.push(process.argv[i]);
    }
    str = arr.join(" ");
}

function myTweets() {
    client.get("statuses/user_timeline", function (error, tweets, response) {
        if (error) {
            return console.log(error);
        } else {
            for (var i = 0; i < 20; i++) {
                console.log(i + 1 + ". " + tweets[i].text);
            }
        }
    })            
}

function spotifyThis(arg) {
    //case if a parameter was not passed in
    if (arg === undefined) {
        arrToString();
        //only run query if an argument was provided
        if (str !== "") {
            //spotify api request
            spotify.search({
                type: "track",
                query: str,
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
                    //if no songs are found or no input is provided, default
                    else {
                        console.log("No song found! :-(");
                    }
                }
            });
        }
        //default if no argument was provided
        else {
            console.log("\nArtist: Ace of Base");
            console.log("Song: The Sign");
            console.log("Album: The Sign (US Album) [Remastered]");
            console.log("Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
        }            
    }
    //case for when a parameter is passed in
    else {
        //only run query if an argument was provided
        if (arg !== "") {
            //spotify api request
            spotify.search({
                type: "track",
                query: arg,
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
                    //if no songs are found or no input is provided, default
                    else {
                        console.log("No song found! :-(");
                    }
                }
            });
        }
        //default if no argument was provided
        else {
            console.log("\nArtist: Ace of Base");
            console.log("Song: The Sign");
            console.log("Album: The Sign (US Album) [Remastered]");
            console.log("Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
        }     
    }
}

function movieThis(arg) {
    if (arg === undefined) {
        arrToString();
        if (str !== "") {
            request("http://www.omdbapi.com/?apikey=trilogy&t=" + str, function (error, response, body) {
                var obj = JSON.parse(body, null, 2);
                if (error) {
                    return console.log(error);
                } else if (obj.Response !== "False") {
                    console.log("\nTitle: " + obj.Title);
                    console.log("Released: " + obj.Released);
                    console.log("IMDB Rating: " + obj.imdbRating);
                    console.log("Rottem Tomatoes Rating: " + obj.Ratings[1].Value);
                    console.log("Produced In: " + obj.Country);
                    console.log("Language: " + obj.Language);
                    console.log("Plot: " + obj.Plot);
                    console.log("Actors: " + obj.Actors);
                } else {
                    console.log("No movie found! :-(");
                }
            });        
        }
        else {
            console.log("\nTitle: Mr. Nobody");
            console.log("Released: 26 September 2013");
            console.log("IMDB Rating: 7.9");
            console.log("Rottem Tomatoes Rating: 66%");
            console.log("Produced In: Belgium, Germany, Canada, France, USA, UK");
            console.log("Language: English, Mohawk");
            console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
            console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger");
        }           
    }
    else {
        if (arg !== "") {
            request("http://www.omdbapi.com/?apikey=trilogy&t=" + arg, function (error, response, body) {
                var obj = JSON.parse(body, null, 2);
                if (error) {
                    return console.log(error);
                } else if (obj.Response !== "False") {
                    console.log("\nTitle: " + obj.Title);
                    console.log("Released: " + obj.Released);
                    console.log("IMDB Rating: " + obj.imdbRating);
                    console.log("Rottem Tomatoes Rating: " + obj.Ratings[1].Value);
                    console.log("Produced In: " + obj.Country);
                    console.log("Language: " + obj.Language);
                    console.log("Plot: " + obj.Plot);
                    console.log("Actors: " + obj.Actors);
                } else {
                    console.log("No movie found! :-(");
                }
            });        
        }
        else {
            console.log("\nTitle: Mr. Nobody");
            console.log("Released: 26 September 2013");
            console.log("IMDB Rating: 7.9");
            console.log("Rottem Tomatoes Rating: 66%");
            console.log("Produced In: Belgium, Germany, Canada, France, USA, UK");
            console.log("Language: English, Mohawk");
            console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
            console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger");
        }     
    }
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        else {
            var whatToDo = data.slice(0, data.indexOf(","));
            var searchParam = data.slice(data.indexOf(",") + 1, data.length);
            if (whatToDo === "my-tweets") {
                MyTweets(searchParam);
            }
            else if (whatToDo === "spotify-this-song") {
                spotifyThis(searchParam);
            } 
            else if (whatToDo === "movie-this") {
                movieThis(searchParam);
            }
        }
    }); 
}

//******SCRIPT******

//when user asks for tweets
if (task === "my-tweets") {
    MyTweets();
  //when user asks for spotify
} else if (task === "spotify-this-song") {
    spotifyThis();
  //when user asks for movie info
} else if (task === "movie-this") {
    movieThis();
  //print from random.txt
} else if (task === "do-what-it-says") {
    doWhatItSays();
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