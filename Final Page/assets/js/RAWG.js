let appID=852
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
    document.getElementById('cardHead').innerHTML = `
    <img src="${data.background_image}">
    <span class="card-panel card-title"><a href="${data.website}" class='black-text cardTitle'>${data.name}</a></span>
    `
    document.getElementById('gameDesc').innerHTML = `${data.description}`

  })
  .catch(err => console.error(err))