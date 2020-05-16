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
