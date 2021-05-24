let appID=654
axios.get('https://cors-proxy-j.herokuapp.com/', {
  headers: {
    // url
    'Target-URL': `https://api.rawg.io/api/games/${appID}?key=2c28abeb9697423fbf38597eb19afcd2`
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
        'Target-URL': `https://api.rawg.io/api/games/${appID}/movies?key=2c28abeb9697423fbf38597eb19afcd2`
        ,
        'Authorization': 'Bearer lbogapYHxff9h2fSNoWEoM420b8mRfQ4JBsiphR6BtaNKlmR51XQt3wCm2ocKhlkvpnv_46BvAcMuB_cTrv7pmRtuMMplxzaBAA_nAU57ttpRZlv9y05lvxWcXUoX3Yx'
      }
    })
    .then(resp => {
      let trailer = resp.data.results[0].data.max
      document.getElementById('cardHead').innerHTML = `
      <img src="${data.background_image}">
      <span class="card-panel card-title"><a href="${data.website}" class='black-text cardTitle'>${data.name}</a></span>
      `
      document.getElementById('gameDesc').innerHTML = `${data.description}`
      document.getElementById('trailerBox').innerHTML = `
      <source src = "${trailer}" type = "video/mp4" >
      `
      for (let d = 0; d < data.developers.length; d++) {
        document.getElementById('Devs').innerHTML +=`${data.developers[d].name}`
        if (d < data.developers.length - 1) document.getElementById('Devs').innerHTML +=', '
      }
      for (let g = 0; g < data.genres.length; g++) {
        document.getElementById('Genres').innerHTML +=`${data.genres[g].name}`
        if (g < data.genres.length - 1) document.getElementById('Genres').innerHTML +=', '
      }
      for (let p = 0; p < data.platforms.length; p++) {
        document.getElementById('platforms').innerHTML +=`${data.platforms[p].platform.name}`
        if (p < data.platforms.length - 1) document.getElementById('platforms').innerHTML +=', '
      }
      
    })
    .catch(err => console.error(err))
    
  })
  .catch(err => console.error(err))
  