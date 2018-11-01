//npm i etc.


var request = require("request");


require("dotenv").config();
var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


//process.argv commands

console.log("Welcome, my name is Liri.  Please issue me an order by typing concert-this, spotify-this-song, or movie-this followed by an appropriate query.  Put queries of more than one word in quotes!");

var command = process.argv[2];

var input = process.argv[3];

console.log(command, input); 3

if (command == "concert-this") {
    concertThis();
}
else if (command == "spotify-this-song") {
    spotifyThis();
} else if (command == "movie-this") {
    movieThis();
} else {
    console.log('Not a valid command')
}

//functions

function concertThis() {
    console.log("============================")
    console.log("Searching for Concerts...")

    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonBody = JSON.parse(body)
            // console.log(jsonBody)



            console.log("============================")
            console.log(input + " is playing at...")


            // if (jsonBody = "") {
            //     console.log("/////////////////////////////")
            //     console.log("NO RESULTS... are you sure you inputted that name correctly?")
            // }

            for (var i = 0; i < jsonBody.length; i++) {
                console.log("============================")
                console.log("VENUE: " +
                    jsonBody[i].venue.name + " | " +
                    jsonBody[i].venue.city + " | " +
                    jsonBody[i].venue.country);

                console.log("DATE: " + jsonBody[i].datetime)

            }

        }
    });
}


function spotifyThis() {
    if (input === undefined) {
        input = "The Sign by Ace of Base"
    }
    console.log(input)

    console.log("============================")
    console.log("Searching for songs...")


    spotify.search(
        {
            type: "track",
            query: input,
            limit: 10
        },
        function (err, data) {
            if (err) {
                    console.log("Error occurred, maybe you didn't put a song name after spotify-this?")
                    return;
                } else {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    console.log("============================")
                    console.log("Artist: " + data.tracks.items[i].artists[0].name);
                    console.log("Song name: " + data.tracks.items[i].name);
                    console.log("Preview song link: " + data.tracks.items[i].preview_url);
                    console.log("Album: " + data.tracks.items[i].album.name);
                }
            }
        });
};

function movieThis() {
    if (input === undefined) {
        input = "Mr Nobody"
    }
    console.log(input)

    var omdbapi = "http://www.omdbapi.com/?t=" + input + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    request(omdbapi, function (error, response, body) {
        var jsonBody = JSON.parse(body);
        console.log("============================")
        console.log("Title: " + jsonBody.Title);
        console.log("Year: " + jsonBody.Year);
        console.log("IMDB Score: " + jsonBody.imdbRating);
        console.log("Rotten Tomatoes Score: " + jsonBody.Ratings[1].Value);
        console.log("Country: " + jsonBody.Country);
        console.log("Language: " + jsonBody.Language);
        console.log("Plot: " + jsonBody.Plot);
        console.log("Actors: " + jsonBody.Actors);
    
    });
}
