$.ajax({
  url: 'https://api.lyrics.ovh/v1/Tycho/H E R'
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
