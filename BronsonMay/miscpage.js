// search button functionality
const searchBtn = (btnID) => {
  let gameFind = document.getElementById(btnID).value
  localStorage.removeItem('userLookup')
  userLookup = []
  userLookup.push({ gameFind })
  localStorage.setItem('userLookup', JSON.stringify(userLookup))
  window.open('../results folder/results.html', '_self', false)
  console.log(gameFind)
}
// sidenav
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
// search buttons
document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault()
  searchBtn('search')
})
document.getElementById('submiticon').addEventListener('click', event => {
  event.preventDefault()
  searchBtn('search')
})
document.getElementById('submitM').addEventListener('click', event => {
  event.preventDefault()
  searchBtn('mobileSearch')
})