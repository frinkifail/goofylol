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
    var price = ((player.goofypills**1.25)*15).toFixed(1)
    document.getElementById("gpcost").innerHTML = price
    if (player.points >= price && !a){
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
  let pntsps = (player.pointspersec + player.goofypills)
  document.getElementById("points").innerHTML = player.points.toFixed(2)
  document.getElementById("pps").innerHTML = pntsps.toFixed(2)
  BuyGoof(1,true)
},1000/100)
// am bacc
//what you do?
