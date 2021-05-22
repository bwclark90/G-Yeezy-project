document.getElementById('searchGames').addEventListener('click', event =>{
  event.preventDefault()
  console.log('ping')


axios.get('https://cors-proxy-j.herokuapp.com/', {
  headers: {
    
    'Target-URL': `https://api.rawg.io/api/games?key=2c28abeb9697423fbf38597eb19afcd2&search=${document.getElementById('title').value}`
,
    
    'Authorization': 'Bearer lbogapYHxff9h2fSNoWEoM420b8mRfQ4JBsiphR6BtaNKlmR51XQt3wCm2ocKhlkvpnv_46BvAcMuB_cTrv7pmRtuMMplxzaBAA_nAU57ttpRZlv9y05lvxWcXUoX3Yx'
  }
})
  .then( res => {
    
    let videoGames = res
    console.log(videoGames)
    document.getElementById('videoGames').innerHTML = ''
   

  })
  .catch(err => console.error(err))

})
