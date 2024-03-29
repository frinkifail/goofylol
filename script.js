import { format } from "./format.js";
// starting data
let deltatime = 0;
let player = {
  lastTick: Date.now(),
  points: 0,
  pointspersec: 0,
  goofypills: 1,
  longgoofypills: 0,
  susgoofygp: 0,
  silliness: 0,
};

window.printPlayerData = () => console.log(player);

// Teste's Save and Load Functions :3
function Save() {
  localStorage.setItem("goofyahhgame-save", btoa(JSON.stringify(player)));
}
function Load() {
  if (localStorage.getItem("goofyahhgame-save") != null) {
    const data = JSON.parse(atob(localStorage.getItem("goofyahhgame-save")));
    for (const i in data) player[i] = data[i]; // NOTE: this exists to support old saves
  }
}

Load();

function assignOnclick() {
  // so we dont have global variables cluttering everything :3
  const goofypillsbutton = document.getElementById("goofypills");
  goofypillsbutton.onclick = () => BuyGoof(1, false);

  const longergoofypillsbutton = document.getElementById("longergoofypills");
  longergoofypillsbutton.onclick = () => BuyGoof(2, false);
  
  const susgoofygreenpowderbutton = document.getElementById("susgoofygreenpowder");
  susgoofygreenpowderbutton.onclick = () => BuyGoof(3, false);
  
  const tabgoof = document.getElementById("goofbutton");
  
  const tabsilly = document.getElementById("sillybutton");
}

assignOnclick();

function SetTab(tabId){
  if (tabId == 0){
    document.getElementById("gooftab").style.display = "inline";
  } else {document.getElementById("gooftab").style.display = "none";}
  if (tabId == 1){
    document.getElementById("void").style.display = "inline";
  }
}

// shop stuff
/**
 * x = item id
 * a = update only
 */
function BuyGoof(x, a) {
  const doStuff = (mode) => {
    let price;
    let prefix;
    let data;
    if (mode == 1) {
      // x is 1
      prefix = "gp";
      price = player.goofypills ** 1.25 * 15;
      data = player.goofypills;
    } else if (mode == 2) {
      prefix = "lgp";
      price = (player.longgoofypills + 1) ** 1.35 * 1000;
      data = player.longgoofypills;
    } else if (mode == 3) {
      prefix = "sggp";
      price = (player.susgoofygp + 1) ** 1.135 * 250;
      data = player.susgoofygp;
    } else{
      price = null;
      prefix = "";
    }
    // console.debug(prefix)
    document.getElementById(`${prefix}cost`).textContent = format(price);
    document.getElementById(`${prefix}amount`).textContent = data;
    return price;
  };

  if (x == 1 || a) {
    // slight reformat vvvvvv
    // DONE: maybe reformat this in the future
    // console.log(x)
    const price = doStuff(1);
    if (player.points >= price && !a) {
      player.points -= price;
      player.goofypills += 1;
    }
  }
  if (x == 2 || a) {
    const price = doStuff(2);
    if (player.points >= price && !a) {
      player.points -= price;
      player.longgoofypills += 1;
    }
  }
  if (x == 3 || a){
    const price = doStuff(3);
    if (player.pointspersec >= price && !a) {
      player.pointspersec -= price;
      player.susgoofygp += 1;
  }
}
}

// main loop
var timesincelastsave = 0;
player.lastTick = Date.now();
setInterval(() => {
  // deltatime
  deltatime = (Date.now() - player.lastTick) / 1000;
  player.lastTick = Date.now();

  // point gain
  let pntsps = player.pointspersec + player.goofypills;
  player.points += deltatime * (player.pointspersec + player.goofypills);

  // pps gain
  let bonuspps =
    (1.001 ** (Math.log10(player.points < 1 ? 1 : player.points) - 1) / 25) *
    (player.susgoofygp/100);
  player.pointspersec += deltatime * (bonuspps + player.longgoofypills / 125);

  // showing
  document.getElementById("deltatime").textContent = Math.round(1 / deltatime);
  document.getElementById("points").textContent = format(player.points);
  document.getElementById("pps").textContent = format(pntsps);
  document.getElementById("usablepps").textContent = format(
    player.pointspersec
  );
  BuyGoof(0, true);

  // saving
  timesincelastsave += deltatime;
  if (timesincelastsave >= 20) {
    Save();
    timesincelastsave = 0;
  }
  // read only player watch / which is apparently not readonly
  window.player = player;
}, 1000 / 100);
