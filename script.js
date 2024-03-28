var deltatime = 0
var lasttime = 0
var player = {
  points: 0,
  pointspersec: 1,
  goofypills: 0,
  longgoofypills: 0,
  susgoofygp: 0,
  silliness: 0
}
function BuyGoof(x){
  let gpprice = (player.goofypills+15)**1.5
  if (x == 1){
    if (player.points >= gpprice){
      player.points -= gpprice
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
  document.getElementById("pps").innerHTML = player.pointspersec.toFixed(2)
},1000/100)
// am bacc
//what you do?
