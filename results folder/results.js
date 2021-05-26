document.getElementById('searchGames').addEventListener('click', event => {
  event.preventDefault()



  axios.get('https://cors-proxy-j.herokuapp.com/', {
    headers: {

      'Target-URL': ` https://api.rawg.io/api/games?key=2c28abeb9697423fbf38597eb19afcd2&page_size=6&search=${document.getElementById('title').value}`
      ,

      'Authorization': 'Bearer lbogapYHxff9h2fSNoWEoM420b8mRfQ4JBsiphR6BtaNKlmR51XQt3wCm2ocKhlkvpnv_46BvAcMuB_cTrv7pmRtuMMplxzaBAA_nAU57ttpRZlv9y05lvxWcXUoX3Yx'
    }
  })
    .then(resp => {
      let videoGames = resp.data.results
      console.log(videoGames)
      videoGames.forEach(videoGame => {
        let gameElem = document.createElement('div')
        gameElem.className = 'col-s3'
        gameElem.innerHTML = ` <div class="row">
        <div class="col s12 m7">
        <div class="card">
        <div class="card-image">
          <img src="${videoGame.background_image}" alt = "${videoGame.slug}">
          <span class="card-title">${videoGame.slug}</span>
        </div>
        <div class="card-content">
          <p>Released: ${videoGame.released}</p>
          <p>Community Rating: ${videoGame.rating}/5</p>
        </div>
        <div class="card-action">
          <a href="#">link to main search page</a>
        </div>
      </div>
    </div>
  </div>`
        document.getElementById('videoGames').append(gameElem)
      })


    })
    .catch(err => console.error)
})