// AJAX call for lyrics to the song; user must input artist and song (using Lyrics.ovh)
$.ajax({
  url: 'https://api.lyrics.ovh/v1/Tycho/"Pink & Blue (feat. Saint Sinner)"'
}).then(
  (data) => {
    console.log(data)
  },
  (error) => {
    console.log(error)
  }
)

// SongMeanings API:
// http://developer.echonest.com/api/v4/song

// AJAX call for artist info and album info for the track requested (using Deezer)
$.ajax({
  url:
    'https://api.deezer.com/search?q=track:%22Rosyln%22%20artist:%22Bon%20Iver%22'
}).then(
  (data) => {
    console.log(data)
  },
  (error) => {
    console.log(error)
  }
)
