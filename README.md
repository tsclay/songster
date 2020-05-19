# Songster
---

## What it does 

Songster is an app that allows one to search for their favorite song and retreive its lyrics and an official, or "official", music video from YouTube.

## How it works

Songster takes submitted searches and uses them to make AJAX requests to the Genius API.

### Step by Step

1. Fetch the top 10 search results for the query.
2. User clicks which option fits their search best, or search again.
3. Two AJAX requests, each doing the following:
   1. Grab the "song" object for the song from Genuis' database.
   2. Grabs the URL for the lyrics from Genius' website.
4. jQuery grabs the HTML and locates the necessary tags containing the lyrics and any relevant information.
5. Lyrics and info display in the DOM.

Learn more about the Genius API here:
<https://docs.genius.com/#/getting-started-h1>

---

## Resources

Genius API demo and reference for syntax needed to work with API:
https://www.youtube.com/watch?v=-TgXQQQdzWY

When YouTube videos don't play when embedded in the page:
<https://stackoverflow.com/questions/51969269/embedded-youtube-video-doesnt-work-on-local-server>

When embedded YouTube videos don't show at all:
<https://stackoverflow.com/questions/18251128/why-am-i-suddenly-getting-a-blocked-loading-mixed-active-content-issue-in-fire>

The reference for working with YouTube API, but also is good reference for syntax of embedding videos:
<https://developers.google.com/youtube/iframe_api_reference>
