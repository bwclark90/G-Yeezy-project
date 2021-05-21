
axios.get('https://cors-proxy-j.herokuapp.com/', {
  headers: {
    
    'Target-URL': "https://api.rawg.io/api/games?key=2c28abeb9697423fbf38597eb19afcd2&search=stardew valley"
,
    
    'Authorization': 'Bearer lbogapYHxff9h2fSNoWEoM420b8mRfQ4JBsiphR6BtaNKlmR51XQt3wCm2ocKhlkvpnv_46BvAcMuB_cTrv7pmRtuMMplxzaBAA_nAU57ttpRZlv9y05lvxWcXUoX3Yx'
  }
})
  .then(({ data }) => {
    console.log(data)

  })
  .catch(err => console.error(err))

 
