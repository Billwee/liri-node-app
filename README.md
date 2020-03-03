# The Liri Bot

Hello and welcome to my Language Interpretation and Recognition Interface (LIRI) Bot! In this readme I'll be going over the operation and utilization of LIRI and everything it can do.

## Problem Solving

Liri is an all-in-one application for finding information on movies and music artists. If you have questions about a certain movie, song, or concert date then LIRI can help you find answers.

## Application Organization

LIRI uses three different node packages to retrieve it's information based on the users search query. It also uses a specific command to make a call to one of these databases by reading the contents of a .txt file.

## Before You Start

Before using LIRI you will need to sign up as a developer at Spotify to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

- Step One: Visit <https://developer.spotify.com/my-applications/#!/>

- Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

- Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

- Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use LIRI

Afterwards create a file named `.env` in your main directory after cloning this application, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

## Using LIRI

Now you're ready to use LIRI

There are four different commands that you can use.

1. `node liri.js concert-this <artist/band name here>`

   - This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal and the log.txt file:

     - Name of the venue

     - Venue location

     - Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   - This will search Spotify for the song and display the first 20 results with the following information and write them to the log.txt file

     - Artist

     - The song's name

     - A preview link of the song from Spotify (if available)

     - The album that the song is from

   - If no song is provided or found then LIRI will default to "The Sign" by Ace of Base.

   - You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

3. `node liri.js movie-this '<movie name here>'`

   - This will output the following information to your terminal/bash window and write it to the log.txt file:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   - If you dont type a movie in or nothing is found, LIRI will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`

   - LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

## Video Demonstration

Here is LIRI in action: [Click Here](https://drive.google.com/file/d/1-lM76DrbV8cFzkm9IeUkgqLlB9HpDXxT/view?usp=sharing)
