const settings = {
  async: true,
  crossDomain: true,
  url: 'https://genius.p.rapidapi.com/artists/16775/songs',
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'genius.p.rapidapi.com',
    'x-rapidapi-key': 'c81d596334mshded634b6334b58dp1ad359jsna805e1f5d13a'
  }
}

$.ajax(settings).done(function (response) {
  console.log(response)
})
