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
function format(x){
  if (0.1 > x){
    return "1/"+(x**-1).toFixed(2)
  }
  else if(x < 1000){
    return x.toFixed(2)
  }
  else if (x < 100000){
    return x.toFixed(1)
  }
  else if (x < 1000000){
    return x.toFixed(0)
  }
  else if (x >= 1000000){
    let log10x = Math.floor(Math.log10(x))
    let xoverl10x = x/(10**log10x)
    if (xoverl10x >= 10){
      return ((xoverl10x/10).toFixed(2)+"e"+((log10x+1)))
    }
    else {
      return ((xoverl10x).toFixed(2)+"e"+((log10x)))
    }
  }
}
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
  if (x == 2){
    var price = (((player.longgoofypills+1)**1.35)*1000)
    if (player.points >= price && !a){
      player.points -= price
      player.goofypills+=1
    }
  }
}

player.lastTick = Date.now()
setInterval(() => {
  deltatime = (Date.now() - player.lastTick)/1000
  player.lastTick = Date.now()
  document.getElementById("deltatime").innerHTML = Math.round(1/deltatime)
  player.points += deltatime * (player.pointspersec + player.goofypills)
  player.pointspersec += deltatime * ((((1.0001**((Math.log10(player.points < 1 ? 1 : player.points))-1))/25) * 0))
  let pntsps = (player.pointspersec + player.goofypills)
  document.getElementById("points").innerHTML = format(player.points)
  document.getElementById("pps").innerHTML = format(pntsps)
  BuyGoof(1,true)
},1000/100)
// am bacc
//what you do?
