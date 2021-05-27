// let finalPage = JSON.parse(localStorage.getItem('final')) || []
let userLookup = JSON.parse(localStorage.getItem('userLookup')) || []
let userLookup2 = JSON.parse(localStorage.getItem('userLookup')) || []


// main search function
const searchGame = (value) => {
  axios.get('https://cors-proxy-j.herokuapp.com/', {
    headers: {
      'Target-URL': ` https://api.rawg.io/api/games?key=2c28abeb9697423fbf38597eb19afcd2&page_size=6&search=${value}`
      ,
  
      'Authorization': ''
    }
  })
    .then(resp => {
      let videoGames = resp.data.results
      console.log(videoGames)
      document.getElementById('videoGames').innerHTML = ''
      videoGames.forEach(videoGame => {
        let gameElem = document.createElement('div')
        gameElem.className = 'col-s12 m4'
        gameElem.innerHTML = ` <div class="col m4">
        <div class="card medium">
        <div class="card-image">
          <img src="${videoGame.background_image}" alt = "${videoGame.slug}">
          <span class="card-title">${videoGame.name}</span>
        </div>
        <div class="card-content">
        <p>${videoGame.name}
          <p>Released: ${videoGame.released}</p>
          <p>Community Rating: ${videoGame.rating}/5</p>
        </div>
        <div class="card-action">

          

         <a href="#" class ="addFinal">Get data</a>

        </div>
        </div>
        `
        console.log(videoGame.id)
        document.getElementById('videoGames').append(gameElem)
      })
      document.getElementById('title').value = ''
    })
    .catch(err => console.error)
}
// load in process
if (userLookup.length > 0) {
  searchGame(userLookup[0].gameFind)
  document.getElementById('title').innerHTML=`${userLookup[0].gameFind}`
  localStorage.removeItem('userLookup')
  userLookup = []
}
// Listerners
// Main search button
document.getElementById('searchGame').addEventListener('click', event => {
  event.preventDefault()
  console.log('ping')
  searchGame(document.getElementById('title').value)
  document.getElementById('title').innerHTML = ``
})
document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault()
  searchGame(document.getElementById('search').value)
})
document.getElementById('submiticon').addEventListener('click', event => {
  event.preventDefault()
  searchGame(document.getElementById('search').value)
})
document.getElementById('submitM').addEventListener('click', event => {
  event.preventDefault()
  searchGame(document.getElementById('mobileSearch').value)
})
// sidenav
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
// link final
document.addEventListener('click', event => {
  if (event.target.classList.contains('addFinal')) {
    localStorage.removeItem('userLookupID')
    userLookupID = []
    let linkID = event.target.getAttribute('data-id')
    userLookupID.push({ linkID})
    localStorage.setItem('userLookupID', JSON.stringify(userLookupID))
    window.open('../Final Page/final.html', '_self', false)
    console.log(linkID)
  }
})