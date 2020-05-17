//==================================================
// Access Genius API for song data, then use the
// song ID to fetch the song doc for that song to
// get more exhaustive data
//==================================================

// Link to help for Genius API: https://www.youtube.com/watch?v=-TgXQQQdzWY
const token = 'OxYfGhNsuLpSKms2y3EW7jrnIY21V5Yg6GyrOthWokYbDI5k280rvP-KTpTbNwVq'

let songLyrics = ''

$('form').on('submit', (event) => {
  $('.container').empty()
  event.preventDefault()
  const query = $('input').val()
  console.log(query)

  $.ajax({
    url: `https://api.genius.com/search?access_token=${token}&q=${encodeURIComponent(
      query
    )}`
  }).then(
    (data) => {
      // Song title followed with artist and featured, if applies

      console.log(data.response.hits[0].result)

      for (let i = 0; i < data.response.hits.length; i++) {
        const songID = data.response.hits[i].result.id
        const shortTitle = data.response.hits[i].result.title
        const fullTitle = data.response.hits[i].result.full_title
        const hit = $('<div>')
          .addClass('general-search-result')
          .attr('song-id', `${songID}`)
          .attr('song-name', `${shortTitle}`)
        const songAndArtist = $('<div class="genius-song-link">').text(
          fullTitle
        )
        const albumArt = $('<img class=album-art>').attr(
          'src',
          data.response.hits[i].result.header_image_url
        )

        hit.append(songAndArtist).append(albumArt)
        $('.container').append(hit)
      }

      $('.general-search-result').on('click', (event) => {
        const songID = $(event.currentTarget).attr('song-id')
        console.log(songID)
        const shortTitle = $(event.currentTarget).attr('song-name')

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
            console.log(songLyrics)

            $.ajax({
              url: `https://cors-anywhere.herokuapp.com/${songLyrics}`,
              crossDomain: true,
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then(
              (lyrics) => {
                let $search = $(lyrics).children().eq(6).text()
                $search = $search.slice(
                  $search.indexOf(`${shortTitle} Lyrics`),
                  $search.indexOf('More on Genius')
                )
                console.log($search)
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
      })
    },
    (error) => {
      console.log('General search error', error)
    }
  )

  // Help for the 'settings' object preceding the then-callback is brought to me in part by RapidApi and their awesome code snippets (not sponsored)
})
