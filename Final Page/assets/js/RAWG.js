// Global Variables/functions
let appID = 10340
const getID = (ID) => document.getElementById(ID)
// display Modals functions
const loopDisplay = (dataproperty, tag) => {
  for (let t = 0; t < dataproperty.length; t++) {
    getID(tag).innerHTML += `<a class="waves-effect waves-light btn modal-trigger" href="#modal1" data-name="${dataproperty[t].name}" data-search="${dataproperty[t].slug}">${dataproperty[t].name}</a>`
    // if (t < dataproperty.length - 1) document.getElementById(tag).innerHTML += ', '
  }
}

// BIG FAT API CALL
const infoDump = (searchVal) => {
  // universal api reference made by the one true god, Quinton.
  axios.get('https://cors-proxy-j.herokuapp.com/', {
    headers: {
      // url
      'Target-URL': `https://api.rawg.io/api/games/${searchVal}?key=2c28abeb9697423fbf38597eb19afcd2`
      // 'Target-URL': `https://api.rawg.io/api/games/${appID}/movies?key=2c28abeb9697423fbf38597eb19afcd2`
      // 'Target-URL': "https://api.rawg.io/api/games?key=2c28abeb9697423fbf38597eb19afcd2&search=bioshock"
      ,
      'Authorization': 'Bearer lbogapYHxff9h2fSNoWEoM420b8mRfQ4JBsiphR6BtaNKlmR51XQt3wCm2ocKhlkvpnv_46BvAcMuB_cTrv7pmRtuMMplxzaBAA_nAU57ttpRZlv9y05lvxWcXUoX3Yx'
    }
  })
    .then(({ data }) => {
      console.log(data)
      axios.get('https://cors-proxy-j.herokuapp.com/', {
        headers: {
          'Target-URL': `https://api.rawg.io/api/games/${searchVal}/movies?key=2c28abeb9697423fbf38597eb19afcd2`
          ,
          'Authorization': 'Bearer lbogapYHxff9h2fSNoWEoM420b8mRfQ4JBsiphR6BtaNKlmR51XQt3wCm2ocKhlkvpnv_46BvAcMuB_cTrv7pmRtuMMplxzaBAA_nAU57ttpRZlv9y05lvxWcXUoX3Yx'
        }
      })
        .then(resp => {
          // display information
          console.log(resp.data.count)
          if (resp.data.count === 0) {
            getID('trailerBox').innerHTML = `<img src="${data.background_image_additional}">`
          } else {
            let trailer = resp.data.results[0].data.max
            getID('trailerBox').innerHTML = `
              <video class="materialboxed responsive-video" controls>
              <source src = "${trailer}" type = "video/mp4" >
              </video>
            `
          }
          getID('cardHead').innerHTML = `
          <img src="${data.background_image}">
          <span class="card-panel card-title"><a href="${data.website}" class='black-text cardTitle'>${data.name}</a></span>
            `
          getID('gameDesc').innerHTML = `${data.description}`
          loopDisplay(data.developers, 'Devs')
          loopDisplay(data.genres, 'Genres')
          for (let p = 0; p < data.platforms.length; p++) {
            getID('platforms').innerHTML += `${data.platforms[p].platform.name}`
            if (p < data.platforms.length - 1) getID('platforms').innerHTML += ', '
          }
          for (let t = 0; t < data.tags.length; t++) {
            getID('tags').innerHTML += `${data.tags[t].name}`
            if (t < data.tags.length - 1) getID('tags').innerHTML += ', '
          }
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
      'Authorization': 'Bearer lbogapYHxff9h2fSNoWEoM420b8mRfQ4JBsiphR6BtaNKlmR51XQt3wCm2ocKhlkvpnv_46BvAcMuB_cTrv7pmRtuMMplxzaBAA_nAU57ttpRZlv9y05lvxWcXUoX3Yx'
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

infoDump(appID)
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
document.addEventListener('click', event => {
  if (event.target.classList.contains('modal-trigger')) {
    let searchVal = event.target.getAttribute('data-search')
    let searchName = event.target.getAttribute('data-name')
    infoModal(searchVal, searchName)
  }
})
document.addEventListener('click', event => {
  if (event.target.classList.contains('modalLink')) {
    let searchID = event.target.getAttribute('data-id')
    console.log(searchID)
    infoDump(searchID)
  }
})
