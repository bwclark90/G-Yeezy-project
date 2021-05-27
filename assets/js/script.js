let userLookup = JSON.parse(localStorage.getItem('userLookup')) || []
// simple get function
const getID = (ID) => document.getElementById(ID)

// localStorage.removeItem('userLookup')
// userLookup = []
// search button functionality
const searchBtn = (btnID) => {
  let gameFind = getID(btnID).value
  userLookup.push({ gameFind })
  localStorage.setItem('userLookup', JSON.stringify(userLookup))
  window.open('./results folder/results.html', '_self', false)
  console.log(gameFind)
}
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
    let random = Math.floor(Math.random() * 20)
    console.log(random)

    document.getElementById('kanyeGif').innerHTML = `<img src="${gifs[random].images.fixed_width.url}">`
  })
  .catch(err => console.error(err))

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
getID('submit').addEventListener('click', event => {
  event.preventDefault()
  searchBtn('search')
})
getID('submiticon').addEventListener('click', event => {
  event.preventDefault()
  searchBtn('search')
})
getID('submitM').addEventListener('click', event => {
  event.preventDefault()
  searchBtn('mobileSearch')
})

