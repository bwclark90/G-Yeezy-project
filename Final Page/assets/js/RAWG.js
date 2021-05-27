// Global Variables/functions
let userLookup = JSON.parse(localStorage.getItem('userLookup')) || []
let userLookupID = JSON.parse(localStorage.getItem('userLookupID')) || []
// simple get function
const getID = (ID) => document.getElementById(ID)

// search button functionality
const searchBtn = (btnID) => {
  let gameFind = getID(btnID).value
  localStorage.removeItem('userLookup')
  userLookup = []
  userLookup.push({ gameFind })
  localStorage.setItem('userLookup', JSON.stringify(userLookup))
  window.open('../results folder/results.html', '_self', false)
  console.log(gameFind)
}

// display Modals functions
const loopModals = (dataproperty, tag) => {
  getID(tag).innerHTML = ""
  for (let t = 0; t < dataproperty.length; t++) {
    getID(tag).innerHTML += `<a class="waves-effect waves-light btn modal-trigger" href="#modal1" data-name="${dataproperty[t].name}" data-search="${dataproperty[t].slug}">${dataproperty[t].name}</a>`
  }
}
const loopDisplay = (dataproperty, tag) => {
  getID(tag).innerHTML = ""
  for (let t = 0; t < dataproperty.length; t++) {
    getID(tag).innerHTML += `${dataproperty[t].name}`
    if (t < dataproperty.length - 1) getID(tag).innerHTML += ', '
  }
}

// Cheapshark
const cheapsharkInfo = (searchName) => {
  axios.get(`https://www.cheapshark.com/api/1.0/games?title=${searchName}&exact=0`)
    .then(resp => {
      let price = resp.data
      console.log(price.length)
      if (price.length > 0) {
        getID('cheapest').innerHTML = `Cheapest Price: $${price[0].cheapest} USD`
        getID('cheapLink').innerHTML = `<a class="waves-effect waves-dark btn green lighten-1" target="_blank" href="https://www.cheapshark.com/redirect?dealID=${price[0].cheapestDealID}">Go to Store</a>`        
      }else {
        getID('cheapest').innerHTML = `Cheapest Price: N/A`
        getID('cheapLink').innerHTML = `<a class="waves-effect waves-dark btn green lighten-1" target="_blank" href="https://myanimelist.net/anime/18507/Free">Free?</a>`
      }
    })
    .catch(err => console.error(err))
}

// steam api query
const steamInfo = (searchVal) => {
  axios.get('https://cors-proxy-j.herokuapp.com/', {
    headers: {
      // url
      'Target-URL': `https://api.rawg.io/api/games/${searchVal}/stores?key=2c28abeb9697423fbf38597eb19afcd2`
      ,
      'Authorization': ''
    }
  })
    .then(respo => {
      let storeID = respo.data.results
      let steamId = 0
      console.log(storeID)
      for (let s = 0; s < storeID.length; s++) {
        if (storeID[s].store_id === 1) {
          let url = storeID[s].url
          let matches = url.match(/(\d+)/)
          steamId = matches[0]
          axios.get(`https://desolate-thicket-86814.herokuapp.com/games/${steamId}`)
            .then(respon => {
              let playerCount = respon.data
              let playerNum = playerCount.response.player_count
                playerNum = playerNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              getID('steamLink').innerHTML =`
              <a class="waves-effect waves-dark btn indigo darken-2" href="${url}" target="_blank">Go to Steam</a>
              `
              getID('playerCount').innerHTML = `
              Current Player Count: ${playerNum}
              `
            })
            .catch(err => console.error(err))
        }
      }
        if (steamId === 0) {
          getID('playerCount').innerHTML = `
          Unfortunately, Not a Steam game
          `
          getID('steamLink').innerHTML = `
          <a class="waves-effect waves-dark btn indigo darken-2" href="https://store.steampowered.com/"
          target="_blank">Go to Steam</a>
          `
        }
    })
    .catch(err => console.error(err))
}

// BIG FAT API CALL
const infoDump = (searchVal) => {
  console.log('ping')
  // universal api reference made by the one true god, Quinton.
  // search rawg for info
  axios.get('https://cors-proxy-j.herokuapp.com/', {
    headers: {
      // url
      'Target-URL': `https://api.rawg.io/api/games/${searchVal}?key=2c28abeb9697423fbf38597eb19afcd2`
      ,
      'Authorization': ''
    }
  })
    .then(({ data }) => {
      console.log(data)
      // search rawg for trailers
      axios.get('https://cors-proxy-j.herokuapp.com/', {
        headers: {
          'Target-URL': `https://api.rawg.io/api/games/${searchVal}/movies?key=2c28abeb9697423fbf38597eb19afcd2`
          ,
          'Authorization': ''
        }
      })
        .then(res => {
          // display information
          console.log(res.data.count)
          if (res.data.count === 0) {
            getID('trailerBox').innerHTML = `<img src="${data.background_image_additional}" alt="${data.name}_backgroundadd">`
          } else {
            let trailer = res.data.results[0].data.max
            getID('trailerBox').innerHTML = `
              <video class="responsive-video" controls>
              <source src = "${trailer}" type = "video/mp4" alt="${data.name}_trailer">
              </video>
            `
          }
          getID('cardHead').innerHTML = `
          <img src="${data.background_image}" alt="${data.name}_background">
            <span class="card-panel card-title">
              <a href="${data.website}" class='black-text cardTitle'>${data.name}</a>
            </span>
          `
          getID('gameDesc').innerHTML = `${data.description}`
          loopDisplay(data.developers, 'Devs')
          loopModals(data.genres, 'Genres')
          getID('platforms').innerHTML = ""
          for (let p = 0; p < data.platforms.length; p++) {
            getID('platforms').innerHTML += `${data.platforms[p].platform.name}`
            if (p < data.platforms.length - 1) getID('platforms').innerHTML += ', '
          }
          loopDisplay(data.tags, 'tags')
          getID('Release').innerHTML = `${data.released}`
          getID('Rating').innerHTML = `${data.rating}/5`
          getID('ESRB').innerHTML = `${data.esrb_rating.name}`

          cheapsharkInfo(data.name)
          steamInfo(searchVal)
          getID('mainBlock').classList.remove('blockstart')
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

// Modal Api Call
const infoModal = (modalItem, Title) => {
  axios.get('https://cors-proxy-j.herokuapp.com/', {
    headers: {
      'Target-URL': `https://api.rawg.io/api/games?key=2c28abeb9697423fbf38597eb19afcd2&genres=${modalItem}`
      ,
      'Authorization': ''
    }
  })
    .then(respo => {
      console.log(respo.data.results)
      let genre = respo.data.results
      getID('modalTitle').innerHTML = `${Title}`
      for (let c = 0; c < 8; c++) {
        getID(`card-${c}`).innerHTML = `
        <div class="card-image">
        <img class="circle responsive-img"src="${genre[c].background_image}">
        </div>
        <div class="card-action">
        <a class="waves-effect waves-dark modalLink modal-close" data-id="${genre[c].id}">${genre[c].name}</a>
        </div>
        `
      }
    })
    .catch(err => console.error(err))
  }
  if (userLookupID.length > 0) {
    infoDump(userLookupID[0].linkID)
  }
// listeners
// modal init
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
// modal trigger
document.addEventListener('click', event => {
  if (event.target.classList.contains('modal-trigger')) {
    let searchVal = event.target.getAttribute('data-search')
    let searchName = event.target.getAttribute('data-name')
    infoModal(searchVal, searchName)
  }
})
// modal link
document.addEventListener('click', event => {
  if (event.target.classList.contains('modalLink')) {
    let searchID = event.target.getAttribute('data-id')
    console.log(searchID)
    infoDump(searchID)
  }
})
// materialbox init
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);
});
// sidenav
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
// search buttons
getID('submit').addEventListener('click', event =>{
  event.preventDefault()
  searchBtn('search')
})
getID('submiticon').addEventListener('click', event =>{
  event.preventDefault()
  searchBtn('search')
})
getID('submitM').addEventListener('click', event =>{
  event.preventDefault()
  searchBtn('mobileSearch')
})