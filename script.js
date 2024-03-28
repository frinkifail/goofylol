var deltatime = 0
var lasttime = 0
var player = {
  points: 0,
  pointspersec: 0,
  goofypills: 1,
  longgoofypills: 0,
  susgoofygp: 0,
  silliness: 0
}
function BuyGoof(x,a){
  if (x == 1 || a){
    var price = (player.goofypills**1.5)*15
    if (player.points >= price){
      player.points -= price
      player.goofypills+=1
    }
  }
}

lasttime = Date.now()
setInterval(() => {
  deltatime = (Date.now() - lasttime)/1000
  lasttime = Date.now()
  document.getElementById("deltatime").innerHTML = Math.round(1/deltatime)
  player.points += deltatime * (player.pointspersec + player.goofypills)
  player.pointspersec += deltatime * ((((1.0001**((Math.log10(player.points < 1 ? 1 : player.points))-1))/25) * 0))
  document.getElementById("points").innerHTML = player.points.toFixed(2)
  document.getElementById("pps").innerHTML = (player.pointspersec + player.goofypills).toFixed(2)
},1000/100)
// am bacc
//what you do?
