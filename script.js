var deltatime = 0
var lasttime = 0
var player = {
  points: 0
}
lasttime = Date.now()
setInterval(() => {
  deltatime = (Date.now() - lasttime)/1000
  lasttime = Date.now()
  document.getElementById("deltatime").innerHTML = Math.round(1/deltatime)
  player.points += deltatime * 5
  document.getElementById("points").innerHTML = Math.round(player.points)
},1000/100)
