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
  player.pointspersec += deltatime * 1
  document.getElementById("points").innerHTML = player.points.toFixed(2)
},1000/100)
