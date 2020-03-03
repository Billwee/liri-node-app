require('dotenv').config();
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require('fs');

var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);

//BANDSINTOWN FUNCTION
var concertThis = function(input) {
  var queryURL =
    'https://rest.bandsintown.com/artists/' +
    input +
    '/events?app_id=codingbootcamp';

  axios
    .get(queryURL)
    .then(function(response) {
      concertArr = [];
      // This conditional checks if there are any concert dates for the
      // artist or not. No shows returns an empty array and we check for
      // that
      if (response.data && response.data.length) {
        // Has concert dates
        fs.appendFile(
          'log.txt',
          `UPCOMING SHOWS FOR ${input.toUpperCase()}\n`,
          function(err) {
            if (err) {
              console.log(err);
            }
          }
        );
        response.data.forEach(item => {
          var obj = {
            Venue: item.venue.name,
            Location: item.venue.city + ',' + item.venue.region,
            Date: moment(item.datetime).format('MM/DD/YYYY')
          };
          concertArr.push(obj);
          fs.appendFile(
            'log.txt',
            `----------\nVenue: ${item.venue.name} \nLocation: ${
              item.venue.city
            }, ${item.venue.region} \n${moment(item.datetime).format(
              'MM/DD/YYYY'
            )}\n`,
            function(err) {
              if (err) {
                console.log(err);
              }
            }
          );
        }); //End of forEach
        console.log(concertArr);
        fs.appendFile('log.txt', `\n \n \n`, function(err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        // No concerts scheduled
        console.log('No concert dates right now');
      }
    })
    .catch(function(err) {
      console.log(err);
      console.log('**No Artist Found**');
    });
};

//SPOTIFY FUNCTION
var spotifyThisSong = function(input) {
  spotify
    .search({ type: 'track', query: input })
    .then(function(response) {
      if (response.tracks.items && response.tracks.items.length) {
        fs.appendFile(
          'log.txt',
          `SPOTIFY SEARCH RESULTS FOR ${input.toUpperCase()}\n`,
          function(err) {
            if (err) {
              console.log(err);
            }
          }
        );
        response.tracks.items.forEach((item, idx) => {
          if (item.preview_url === null) {
            var preview = 'No Preview Available';
          } else {
            var preview = item.preview_url;
          }
          var count = idx + 1;
          console.log(
            'Result: #' +
              count +
              '\nArtist: ' +
              item.artists[0].name +
              '\nSong name: ' +
              item.name +
              '\nPreview URL: ' +
              preview +
              '\nAlbum Name: ' +
              item.album.name +
              '\n'
          );

          fs.appendFile(
            'log.txt',
            `----------\nResult#: ${count} \nArtist: ${item.artists[0].name} \nSong Name: ${item.name} \nPreviewURL: ${preview} \nAlbum Name: ${item.album.name}\n`,
            function(err) {
              if (err) {
                console.log(err);
              }
            }
          );
        });
        fs.appendFile('log.txt', `\n \n \n`, function(err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log(
          "**Sorry, that song wasn't found. Here's 'The Sign' by Ace of Base.**"
        );
        spotify
          .search({ type: 'track', query: 'The Sign' })
          .then(function(response) {
            console.log(response.tracks.items[0].artists[0].name);
            console.log(response.tracks.items[0].name);
            console.log(response.tracks.items[0].preview_url);
            console.log(response.tracks.items[0].album.name);
          });
      }
    })
    .catch(function(err) {
      console.log(
        "**Sorry, that song wasn't found. Here's 'The Sign' by Ace of Base.**"
      );
      spotify
        .search({ type: 'track', query: 'The Sign' })
        .then(function(response) {
          console.log(response.tracks.items[0].artists[0].name);
          console.log(response.tracks.items[0].name);
          console.log(response.tracks.items[0].preview_url);
          console.log(response.tracks.items[0].album.name);
        });

      console.log(err);
    });
};

//OMDB FUNCTION

var movieThis = function(input) {
  var queryURL =
    'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=trilogy';

  axios
    .get(queryURL)
    .then(function(response) {
      let IMDB = '';
      let rotten = '';
      // Sometimes the array of movie ratings returns empty. If
      // it does their valuse are set to "N/A".
      if (response.data && response.data.length) {
        IMDB = response.data.Ratings[0].Value;
        rotten = response.data.Ratings[1].Value;
      } else {
        IMDB = 'N/A';
        rotten = 'N/A';
      }
      fs.appendFile(
        'log.txt',
        `OMDB SEARCH RESULTS FOR ${input.toUpperCase()}\n`,
        function(err) {
          if (err) {
            console.log(err);
          }
        }
      );
      if (response.data.Title === undefined) {
        console.log("**No movie found: Here's the movie 'Mr. Nobody'**");
        axios
          .get(
            'http://www.omdbapi.com/?t=mr nobody&y=&plot=short&apikey=trilogy'
          )
          .then(function(response) {
            console.log(
              'Title: ' +
                response.data.Title +
                '\nYear: ' +
                response.data.Year +
                '\nIMBD Rating: ' +
                IMDB +
                '\nRotten Tomatoes Rating: ' +
                rotten +
                '\nProduction Country: ' +
                response.data.Country +
                '\nLanguage: ' +
                response.data.Language +
                '\nPlot: ' +
                response.data.Plot +
                '\nActors: ' +
                response.data.Actors
            );
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        console.log(
          'Title: ' +
            response.data.Title +
            '\nYear: ' +
            response.data.Year +
            '\nIMBD Rating: ' +
            // IMDB +
            '\nRotten Tomatoes Rating: ' +
            // rotten +
            '\nProduction Country: ' +
            response.data.Country +
            '\nLanguage: ' +
            response.data.Language +
            '\nPlot: ' +
            response.data.Plot +
            '\nActors: ' +
            response.data.Actors
        );
        fs.appendFile(
          'log.txt',
          `----------\nTitle: ${response.data.Title} \nYear: ${response.data.Year} \nIMDB Rating: ${IMDB} \nRotten Tomatoes Rating: ${rotten}} \nProduction Country: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}\n\n\n`,
          function(err) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    })
    .catch(function() {
      console.log("**No movie found: Here's the movie 'Mr. Nobody'**");
      axios
        .get('http://www.omdbapi.com/?t=mr nobody&y=&plot=short&apikey=trilogy')
        .then(function(response) {
          console.log(
            'Title: ' +
              response.data.Title +
              '\nYear: ' +
              response.data.Year +
              '\nIMBD Rating: ' +
              IMDB +
              '\nRotten Tomatoes Rating: ' +
              rotten +
              '\nProduction Country: ' +
              response.data.Country +
              '\nLanguage: ' +
              response.data.Language +
              '\nPlot: ' +
              response.data.Plot +
              '\nActors: ' +
              response.data.Actors
          );
        })
        .catch(function(err) {
          console.log(err);
        });
    });
};

//
//FUNCTION CALL CONDITIONAL
//

//BANDSINTOWN CALL
if (process.argv[2] === 'concert-this') {
  let artist = '';
  for (let i = 3; i < process.argv.length; i++) {
    artist += process.argv[i] + ' ';
  }
  artist = artist.trim();

  concertThis(artist);
} //SPOTIFY CALL
else if (process.argv[2] === 'spotify-this-song') {
  let song = '';

  for (let i = 3; i < process.argv.length; i++) {
    song += process.argv[i] + ' ';
  }

  song = song.trim();

  spotifyThisSong(song);
} //OMDB CALL
else if (process.argv[2] === 'movie-this') {
  let movie = '';

  for (let i = 3; i < process.argv.length; i++) {
    movie += process.argv[i] + ' ';
  }

  movie = movie.trim();

  movieThis(movie);
} //FS CALL
else if (process.argv[2] === 'do-what-it-says') {
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(',');

    if (dataArr[0] === 'concert-this') {
      concertThis(eval(dataArr[1]));
    } else if (dataArr[0] === 'spotify-this-song') {
      spotifyThisSong(eval(dataArr[1]));
    } else if (dataArr[0] === 'movie-this') {
      movieThis(eval(dataArr[1]));
    } else {
      console.log('Invalid txt file parameters.');
    }
  });
} //ERROR MSG
else {
  console.log(
    "**IMPROPER CALL** \n------------\nUse the following format \n------------ \nnode liri.js concert-this <artist/band name here> - FOR CONCERT DATES \nnode liri.js spotify-this-song '<song name here>' - FOR SONG SEARCH \nnode liri.js movie-this '<movie name here>' - FOR MOVIE INFO \nnode liri.js do-what-it-says - FOR TEXT FILE INPUT"
  );
}
