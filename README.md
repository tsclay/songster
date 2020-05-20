# Songster

---

## What it does

Songster is an app that allows one to search for their favorite song and retreive its lyrics and an official, or "official", music video from YouTube.

Songster takes submitted searches and uses them to make AJAX requests to the Genius API. The user sees the top 10 search results for their query and either makes a selection or tries again. On selecting, jQuery is used to web-scrape the lyrics and any additional song info from the lyrics URL for Genius, and to render a \<iframe> tag containing the YouTube link, if one is found.

Learn more about the Genius API here:
<https://docs.genius.com/#/getting-started-h1>

---

## About the lyrics...

The largest problem of this project was the method for retreiving the lyrics. Due to legal reasons, Genius cannot make this easily accessible through their API.

Well, good googly moogly.

However, researching the possibility reminded me that jQuery can take **any** HTML tag and turn it into a workable object chock-full of accessible goodies. So, what if an entire page of content can be made into a jQuery object? With the help of jQuery's `.find()` method, indeed this can work.

---

## Challenges

### Speed, inconsistency, and clunky code

Though this is just the first project, the speed of execution was a problem to me, seeing that no visual cue indicates that data is loading (something to add in a future deployment for sure). The following was in the code base:

```
let $lyricsContent
let $about
if (viewWidth <= 800) {
  $lyricsContent = $(lyrics)
    .children()
    .eq(6)
    .contents()
    .eq(1)
    .contents()
    .eq(5)
    .html()
  $about = $(lyrics)
    .children()
    .eq(6)
    .contents()
    .eq(1)
    .contents()
    .eq(7)
    .html()
} else {
  $lyricsContent = $(lyrics)
    .children()
    .eq(6)
    .contents()
    .eq(5)
    .contents()
    .eq(1)
    .contents()
    .eq(1)
    .contents()
    .eq(3)
    .contents()
    .eq(1)
    .children()
    .eq(0)
    .html()

  $about = $(lyrics)
    .children()
    .eq(6)
    .contents()
    .eq(5)
    .contents()
    .eq(3)
    .contents()
    .eq(3)
    .html()
}
```

Hard to follow right? It also is very inconsistent, and very slow. This next one is **much, much, more** efficient and quick:

```
$.ajax({
   url: `https://cors-anywhere.herokuapp.com/${songLyrics}`,
   crossDomain: true,
   headers: {
      Authorization: `Bearer ${token}`
   }
}).then(
   (lyrics) => {
      console.log($(lyrics).find('.lyrics').html())
      console.log(
      $(lyrics)
         .find('div [initial-content-for="question_list"]')
         .html()
      )
```

So, who needs Python when you have jQuery?

_By the way, if you're interested in the Pythonic way of doing this, there are plenty of resources; this one helped me toward the jQuery solution: <https://bigishdata.com/2016/09/27/getting-song-lyrics-from-geniuss-api-scraping/>_

### YouTube or no YouTube?

Some song selections include no YouTube link or no links at all! When this happens, the code breaks here:

```
for (let i = 0; i < mediaLinks.length; i++) {
   if (mediaLinks[i].provider === 'youtube') {
      audioLink = mediaLinks[i].url
      console.log('link to youtube vid:', audioLink)
   }
}

audioLink = audioLink.replace('watch?v=', 'embed/')
audioLink = audioLink.replace('http', 'https')
```

The solution: Wrap this code inside a condition check for media links in Genius' data.

```
const mediaLinks = song.response.song.media
let audioLink

if (mediaLinks.length !== 0) {
   for (let i = 0; i < mediaLinks.length; i++) {
      if (mediaLinks[i].provider === 'youtube') {
      audioLink = mediaLinks[i].url
      console.log('link to youtube vid:', audioLink)
      }
   }

// etc.
}

```

---

## Resources

Genius API demo and reference for syntax needed to work with API:
https://www.youtube.com/watch?v=-TgXQQQdzWY

Debugging the web-scrape component:
https://api.jquery.com/find/

When YouTube videos don't play when embedded in the page:
<https://stackoverflow.com/questions/51969269/embedded-youtube-video-doesnt-work-on-local-server>

When embedded YouTube videos don't show at all:
<https://stackoverflow.com/questions/18251128/why-am-i-suddenly-getting-a-blocked-loading-mixed-active-content-issue-in-fire>

The reference for working with YouTube API, but also is good reference for syntax of embedding videos:
<https://developers.google.com/youtube/iframe_api_reference>

Workaround for annoying page zoom on form inputs on phones:
<https://medium.com/cssjunction/how-to-stop-zoom-in-on-input-focus-on-mobile-devices-835edcaa2ba4>

```

```
