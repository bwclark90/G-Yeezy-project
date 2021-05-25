axios.get('https://api.kanye.rest/')
  .then(res => {
    let quote = res.data.quote
    console.log(quote)
    document.getElementById('kanyeQuote').innerHTML = `
    "${quote}" -Kanye`
  })
  .catch(err => console.error(err))

axios.get(`https://api.giphy.com/v1/gifs/search?api_key=j6yOF05YP8AGwMifwqeDBZ1RYjr4n0Tj&q=kanye`)
  .then(res => {
    let gifs = res.data.data
    console.log(gifs)
    let random = Math.floor(Math.random() * 10)
    console.log(random)

    document.getElementById('kanyeGif').innerHTML = `<img src="${gifs[random].images.original.url}">`
  })
  .catch(err => console.error(err))

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});