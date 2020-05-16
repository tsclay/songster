// AJAX call for lyrics to the song; user must input artist and song (using Lyrics.ovh)
// const songQuery = 'Pink & Blue (feat. Saint Sinner)'
// $.ajax({
//   url: `https://api.lyrics.ovh/v1/Tycho/${encodeURIComponent(songQuery)}`
// }).then(
//   (data) => {
//     console.log(data)
//   },
//   (error) => {
//     console.log(error)
//   }
// )

// SongMeanings API:
// http://developer.echonest.com/api/v4/song

// AJAX call for artist info and album info for the track requested (using Deezer)
// $.ajax({
//   url:
//     'https://api.deezer.com/search?q=track:%22Rosyln%22%20artist:%22Bon%20Iver%22'
// }).then(
//   (data) => {
//     console.log(data)
//   },
//   (error) => {
//     console.log(error)
//   }
// )

// Link to help for Genius API: https://www.youtube.com/watch?v=-TgXQQQdzWY
const query = 'Pink & Blue by Tycho'
const token = 'OxYfGhNsuLpSKms2y3EW7jrnIY21V5Yg6GyrOthWokYbDI5k280rvP-KTpTbNwVq'
$.ajax({
  url: `https://api.genius.com/search?access_token=${token}&q=${encodeURIComponent(
    query
  )}`
}).then(
  (data) => {
    // Song title followed with artist and featured, if applies
    console.log(data.response.hits[0].result.full_title)
  },
  (error) => {
    console.log(error)
  }
)

// $.ajax({
//   url:
//     'https://cors-anywhere.herokuapp.com/api.genius.com/oauth/authorize?client_id=xatYsk0RC8fMzSTDjGzaXII6nW70Y0wk8J4-Df_dtugnCpGzPrBHDmx_Ww190auy&redirect_uri=https://tsclay.github.io/songster.github.io/&state=STATE&response_type=token'
// }).then(
//   (data) => {
//     console.log(data)
//   },
//   (error) => {
//     console.log(error)
//   }
// )

// $.ajax({
//   url:
//     'https://cors-anywhere.herokuapp.com/api.genius.com/oauth/authorize?client_id=xatYsk0RC8fMzSTDjGzaXII6nW70Y0wk8J4-Df_dtugnCpGzPrBHDmx_Ww190auy&redirect_uri=https://tsclay.github.io/songster.github.io/&state=STATE&response_type=token',
//   method: 'POST'
// })

// 'https://api.genius.com/search?q=Skinny Love Bon Iver',
