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
const token2 =
  'glhXJYWphrHh8Xnoev9a8YKCm4hd78J16RXN-jF0p2YOkBAhTLcZLKp4l47isNNo'
let songID = 0

$.ajax({
  url: `https://api.genius.com/search?access_token=${token}&q=${encodeURIComponent(
    query
  )}`
}).then(
  (data) => {
    // Song title followed with artist and featured, if applies
    console.log(data.response.hits[0].result.full_title)
    // Song ID in Genius to ping the song directly for deeper info
    songID = data.response.hits[0].result.id
    // Help for the 'settings' object preceding the then-callback is brought to me in part by RapidApi and their awesome code snippets (not sponsored)
    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://api.genius.com/songs/${songID}`,
      crossDomain: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      (song) => {
        console.log(song)
      },
      (error) => {
        console.log(error)
      }
    )
  },
  (error) => {
    console.log(error)
  }
)

// songID = 4552408
// $.ajax({
//   url: `https://cors-anywhere.herokuapp.com/https://api.genius.com/songs/${songID}`,
//   crossDomain: true,
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
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
