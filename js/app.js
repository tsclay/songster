//==================================================
// Access Genius API for song data, then use the
// song ID to fetch the song doc for that song to
// get more exhaustive data
//==================================================

// Link to help for Genius API: https://www.youtube.com/watch?v=-TgXQQQdzWY
const token = 'OxYfGhNsuLpSKms2y3EW7jrnIY21V5Yg6GyrOthWokYbDI5k280rvP-KTpTbNwVq'

// const songLyrics = ''

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

      // console.log(data.response.hits[0].result)

      for (let i = 0; i < data.response.hits.length; i++) {
        const songID = data.response.hits[i].result.id
        const title = data.response.hits[i].result.full_title
        const hit = $('<div>')
          .addClass('general-search-result')
          .attr('song-id', `${songID}`)
        const songAndArtist = $('<a class="genius-song-link">').text(title)
        const albumArt = $('<img class="album-art">').attr(
          'src',
          data.response.hits[i].result.header_image_url
        )
        hit.append(songAndArtist).append(albumArt)
        $('.container').append(hit)
      }

      $('.general-search-result').on('click', (event) => {
        const songID = $(event.currentTarget).attr('song-id')
        console.log(songID)

        $.ajax({
          url: `https://cors-anywhere.herokuapp.com/https://api.genius.com/songs/${songID}`,
          crossDomain: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(
          (song) => {
            // console.log(song)
            const songLyrics = song.response.song.url
            console.log(songLyrics)
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

  //
  // Help for the 'settings' object preceding the then-callback is brought to me in part by RapidApi and their awesome code snippets (not sponsored)

  // $.ajax({
  // url: `https://cors-anywhere.herokuapp.com/${songLyrics}`,
  // crossDomain: true,
  // headers: {
  //   Authorization: `Bearer ${token}`
  // }
  // }).done(
  //   (lyrics) => {
  //     // console.log('Lyrics data', data)
  //     // const $lyrics = $.parseHTML(data, null, false)
  //     // console.log($lyrics.find($('routable-page')))
  //     // $(data).find()
  //     let $search = $(lyrics).children().eq(6).text()
  //     $search = $search.slice(
  //       $search.indexOf('Skinny Love Lyrics'),
  //       $search.indexOf('More on Genius')
  //     )
  //     console.log($search, 'asdfasdfasdf')
  //     console.log('are we seeing thiis')
  //     // console.log($htmlData.children())
  //   },
  //   (error) => {
  //     console.log('Lyrics error', error)
  //   }
  // )

  // $.ajax({
  //   url: `https://cors-anywhere.herokuapp.com/https://api.genius.com/songs/${songID}`,
  //   crossDomain: true,
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  //   }).then((song) => {
  //     // console.log(song)
  //     const songLyrics = song.response.song.url
  //     console.log(songLyrics)
  //   },
  //   (error) => {
  //     console.log('Song/ID error:', error))
  //   })
})
