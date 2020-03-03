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
