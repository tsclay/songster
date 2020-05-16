//==================================================
// Access Genius API for song data, then use the
// song ID to fetch the song doc for that song to
// get more exhaustive data
//==================================================

// Link to help for Genius API: https://www.youtube.com/watch?v=-TgXQQQdzWY
const query = 'Duality by Slipknot'
const token = 'OxYfGhNsuLpSKms2y3EW7jrnIY21V5Yg6GyrOthWokYbDI5k280rvP-KTpTbNwVq'
// const token2 =
//   'glhXJYWphrHh8Xnoev9a8YKCm4hd78J16RXN-jF0p2YOkBAhTLcZLKp4l47isNNo'
let songID = 0
let songLyrics = ''

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
        // console.log(song)
        songLyrics = song.response.song.url
        $.ajax({
          url: `https://cors-anywhere.herokuapp.com/${songLyrics}`,
          crossDomain: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(
          (data) => {
            // console.log('Lyrics data', data)
            // const $lyrics = $.parseHTML(data, null, false)
            // console.log($lyrics.find($('routable-page')))
            // $(data).find()
            let $search = $(data).children().eq(6).text()
            $search = $search.slice(
              $search.indexOf('Duality Lyrics'),
              $search.indexOf('More on Genius')
            )
            console.log($search)
            // console.log($htmlData.children())
          },
          (error) => {
            console.log('Lyrics error', error)
          }
        )
      },
      (error) => {
        console.log('Song/ID error:', error)
      }
    )
  },
  (error) => {
    console.log('General search error', error)
  }
)
