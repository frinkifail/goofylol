import {format} from './format.js'
// starting data
var deltatime = 0
var lasttime = 0
var player = {
  lastTick: Date.now(),
  points: 0,
  pointspersec: 0,
  goofypills: 1,
  longgoofypills: 0,
  susgoofygp: 0,
  silliness: 0
}

//Teste's Save and Load Functions :3
function Save(){localStorage.setItem("goofyahhgame-save",btoa(JSON.stringify(player)));}
function Load(){
if (localStorage.getItem("goofyahhgame-save") != null) {
var data = JSON.parse(atob(localStorage.getItem("goofyahhgame-save")))
for (const i in data) player[i] = data[i]}}
Load()

const goofypillsbutton = document.querySelector("goofypills");
goofypillsbutton.addEventListener("click", (event) => {BuyGoof(1,false)});

//shop stuff
function BuyGoof(x,a){
  if (x == 1 || a){
    var price = ((player.goofypills**1.25)*15)
    document.getElementById("gpcost").innerHTML = format(price)
    document.getElementById("gpamount").innerHTML = player.goofypills
    if (player.points >= price && !a){
      player.points -= price
      player.goofypills+=1
    }
  }
  if (x == 2 || a){
    var price = (((player.longgoofypills+1)**1.35)*1000)
    document.getElementById("lgpcost").innerHTML = format(price)
    document.getElementById("lgpamount").innerHTML = player.longgoofypills
    if (player.points >= price && !a){
      player.points -= price
      player.longgoofypills+=1
    }
  }
}

// main loop
var timesincelastsave = 0
player.lastTick = Date.now()
setInterval(() => {
  //deltatime
  deltatime = (Date.now() - player.lastTick)/1000
  player.lastTick = Date.now()
  
  //point gain
  let pntsps = (player.pointspersec + player.goofypills)
  player.points += deltatime * (player.pointspersec + player.goofypills)
  
  //pps gain
  let bonuspps = (((1.0001**((Math.log10(player.points < 1 ? 1 : player.points))-1))/25) * 0)
  player.pointspersec += deltatime * (bonuspps + (player.longgoofypills/125))
  
  //showing
  document.getElementById("deltatime").innerHTML = Math.round(1/deltatime)
  document.getElementById("points").innerHTML = format(player.points)
  document.getElementById("pps").innerHTML = format(pntsps)
  BuyGoof(1,true)
  
  //saving
  timesincelastsave += deltatime
  if (timesincelastsave >= 20){Save(); timesincelastsave = 0}
},1000/100)