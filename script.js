var deltatime = 0
var lasttime = 0
var player = {
  points: 0,
  pointspersec: 0
}
lasttime = Date.now()
setInterval(() => {
  deltatime = (Date.now() - lasttime)/1000
  lasttime = Date.now()
  document.getElementById("deltatime").innerHTML = Math.round(1/deltatime)
  player.points += deltatime * player.pointspersec
  player.pointspersec += deltatime * (0.01+(1.01**((Math.log10(player.points < 1 ? 1 : player.points))-1)))
  document.getElementById("points").innerHTML = player.points.toFixed(2)
  document.getElementById("pps").innerHTML = player.pointspersec.toFixed(2)
},1000/100)
