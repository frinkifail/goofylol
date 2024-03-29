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
function format(x){
  if (0.1 > x){
    return "1/"+(x**-1).toFixed(2)
  }
  if (0.1 <= x || x < 1000){
    return x.toFixed(2)
  }
  if (1000 <= x || x < 100000){
  return x.toFixed(1)
  }
  if (100000 <= x || x < 1000000){
    return x.toFixed(0)
  }
  if (x >= 1000000){
    let log10x = Math.log10(x) 
    let xoverl10x = x/(10**log10x)
    if (xoverl10x >= 10){return (String(xoverl10x/10).toFixed(2)+"e"+String(log10x+1).toFixed(0))}
    else {return (String(xoverl10x).toFixed(2)+"e"+String(log10x).toFixed(0))}
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
}

lasttime = Date.now()
setInterval(() => {
  deltatime = (Date.now() - lasttime)/1000
  lasttime = Date.now()
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
