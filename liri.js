require('dotenv').config();
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require('fs');

var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
