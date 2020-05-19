//==================================================
// Access Genius API for song data, then use the
// song ID to fetch the song doc for that song to
// get more exhaustive data
//==================================================

// Link to help for Genius API: https://www.youtube.com/watch?v=-TgXQQQdzWY
const token = 'OxYfGhNsuLpSKms2y3EW7jrnIY21V5Yg6GyrOthWokYbDI5k280rvP-KTpTbNwVq'

let songLyrics = ''

// https://1stwebdesigner.com/sticky-navigation-bar/
// console.log('form'.offsetTop)
// console.log(form.offsetTop)

const viewWidth = $(window).width()
console.log(viewWidth)

$('form').on('submit', (event) => {
  $('.container').removeClass().addClass('container')
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

      for (let i = 0; i < data.response.hits.length; i++) {
        const songID = data.response.hits[i].result.id
        const fullTitle = data.response.hits[i].result.full_title
        const hit = $('<div>')
          .addClass('general-search-result')
          .attr('song-id', `${songID}`)
          .attr('song-basic-info', `${fullTitle}`)
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
        $('.container').empty()
        $('.container').addClass('lyrics')

        const $lyricsContainer = $('<div class="lyrics-body">')
        $('.lyrics').append($lyricsContainer)
        const $aboutContainer = $('<div class="about-info">')
        $('.lyrics').append($aboutContainer)

        const songID = $(event.currentTarget).attr('song-id')
        console.log(songID)
        const lyricsHeader = $(event.currentTarget).attr('song-basic-info')

        $.ajax({
          url: `https://cors-anywhere.herokuapp.com/https://api.genius.com/songs/${songID}`,
          crossDomain: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(
          (song) => {
            console.log(song)
            songLyrics = song.response.song.url
            const mediaLinks = song.response.song.media
            let audioLink
            for (let i = 0; i < mediaLinks.length; i++) {
              if (mediaLinks[i].provider === 'youtube') {
                audioLink = mediaLinks[i].url
                console.log('link to youtube vid:', audioLink)
              }
            }
            audioLink = audioLink.replace('watch?v=', 'embed/')
            audioLink = audioLink.replace('http', 'https')
            console.log('after embed insert', audioLink)
            const albumArt = song.response.song.header_image_url
            // console.log('the url to the lyrics:', songLyrics)

            $.ajax({
              url: `https://cors-anywhere.herokuapp.com/${songLyrics}`,
              crossDomain: true,
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then(
              (lyrics) => {
                // const test = $(lyrics).children().eq(6)
                // console.log('this should be the lyrics data:', lyrics)
                // console.log('the jQuery obj for lyrics:', $(lyrics).children())
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

                // console.log($lyricsContent)

                // console.log($about)
                // console.log(test2.html())
                // let $lyricsContent = $(lyrics).children().eq(6).html()

                // $lyricsContent = $lyricsContent.slice(
                //   $lyricsContent.indexOf(`${shortTitle} Lyrics`),
                //   $lyricsContent.indexOf('More on Genius')
                // )
                // $('.container').empty()
                // $('.container').addClass('lyrics')
                // const $lyricsContainer = $('<div class="lyrics-body">').append(
                //   $lyricsContent
                // )
                // $('.lyrics').append($lyricsContainer)
                $lyricsContainer.append($lyricsContent)
                $('.lyrics-body').prepend(
                  $('<p class="song-title">').text(lyricsHeader)
                )
                $aboutContainer.append(
                  $(
                    '<iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">'
                  ).attr('src', `${audioLink}`)
                )
                $aboutContainer
                  .append($('<img>').attr('src', albumArt))
                  .append($about)
                // $('.lyrics').append($aboutContainer)
                $('a').removeAttr('href')
                $('div[initial-content-for="album"]').empty()
                $('div[initial-content-for="track_info').empty()
                $('div[class="embedly_preview embedly_preview--video"]').empty()
                // console.log($('.lyrics-body'))
                // console.log('raw data', $lyricsContent)
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
      console.log('General lyricsContent error', error)
    }
  )

  // Help for the 'settings' object preceding the then-callback is brought to me in part by RapidApi and their awesome code snippets (not sponsored)
})

// Have search bar stick to top of window when scrolling down
const searchBar = $('.search-bar').offset().top
$(window).scroll(() => {
  const windowScrollPos = $(window).scrollTop()
  // console.log('window scroll top', windowScrollPos)
  if (windowScrollPos >= searchBar) {
    $('.search-bar').addClass('sticky')
  } else {
    $('.search-bar').removeClass('sticky')
  }
})
