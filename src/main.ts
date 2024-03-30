import { format } from "./format";

declare global {
	interface Window {
		printPlayerData: VoidFunction;
		player: typeof player;
	}
}

// starting data
let deltaTime = 0;
let player = {
	lastTick: Date.now(),
	points: 0,
	pointsPerSec: 0,
	goofyPills: 1,
	longGoofyPills: 0,
	susGoofyGP: 0,
	silliness: 0,
};

window.printPlayerData = () => console.log(player);

// Teste's Save and Load Functions :3
function save() {
	localStorage.setItem("goofyahhgame-save", btoa(JSON.stringify(player)));
}
function load() {
	const item = localStorage.getItem("goofyahhgame-save")
	if (item !== null) {
		const data = JSON.parse(atob(item));
		for (const i in data) player[i] = data[i]; // NOTE: this exists to support old saves
	}
}

load();

function assignOnclick() {
	// so we dont have global variables cluttering everything :3
	document.getElementById("goofypills")!.onclick = () => buyGoof(1, false);
	document.getElementById("longergoofypills")!.onclick = () => buyGoof(2, false);
	document.getElementById("susgoofygreenpowder")!.onclick = () => buyGoof(3, false);

	// tabs
	document.getElementById("goofbutton")!.onclick = () => setTab(0)
	document.getElementById("sillybutton")!.onclick = () => setTab(1)
}

assignOnclick();

const TABS = [
	'goof',
	'silly'
]

function setTab(tabId: number) {
	if (tabId > TABS.length) return;
	const tab = TABS[tabId]
	for (const i in TABS) {
		document.getElementById(TABS[i] + 'tab')!.style.display = 'none';
	}
}

// shop stuff
function buyGoof(itemId: number, updateOnly?: boolean) {
	const doStuff = (mode: number) => {
		let price;
		let prefix;
		let data;
		if (mode == 1) {
			// x is 1
			prefix = "gp";
			price = player.goofyPills ** 1.25 * 15;
			data = player.goofyPills;
		} else if (mode == 2) {
			prefix = "lgp";
			price = (player.longGoofyPills + 1) ** 1.35 * 1000;
			data = player.longGoofyPills;
		} else if (mode == 3) {
			prefix = "sggp";
			price = (player.susGoofyGP + 1) ** 1.135 * 250;
			data = player.susGoofyGP;
		} else {
			price = null;
			prefix = "";
		}
		// console.debug(prefix)
		document.getElementById(`${prefix}cost`)!.textContent = format(price) ?? "unknown";
		document.getElementById(`${prefix}amount`)!.textContent = data;
		return price;
	};

	if (itemId == 1 || updateOnly) {
		// slight reformat vvvvvv
		// DONE: maybe reformat this in the future
		// console.log(x)
		const price = doStuff(1);
		if (player.points >= price && !updateOnly) {
			player.points -= price;
			player.goofyPills += 1;
		}
	}
	if (itemId == 2 || updateOnly) {
		const price = doStuff(2);
		if (player.points >= price && !updateOnly) {
			player.points -= price;
			player.longGoofyPills += 1;
		}
	}
	if (itemId == 3 || updateOnly) {
		const price = doStuff(3);
		if (player.pointsPerSec >= price && !updateOnly) {
			player.pointsPerSec -= price;
			player.susGoofyGP += 1;
		}
	}
}

// main loop
var timeSinceLastSave = 0;
player.lastTick = Date.now();
setInterval(() => {
	// deltatime
	deltaTime = (Date.now() - player.lastTick) / 1000;
	player.lastTick = Date.now();

	// point gain
	let pntsps = player.pointsPerSec + player.goofyPills;
	player.points += deltaTime * (player.pointsPerSec + player.goofyPills);

	// pps gain
	let bonuspps =
		(1.001 ** (Math.log10(player.points < 1 ? 1 : player.points) - 1) / 25) *
		(player.susGoofyGP / 100);
	player.pointsPerSec += deltaTime * (bonuspps + player.longGoofyPills / 125);

	// showing
	document.getElementById("deltatime")!.textContent = Math.round(1 / deltaTime).toString();
	document.getElementById("points")!.textContent = format(player.points) ?? "unknown";
	document.getElementById("pps")!.textContent = format(pntsps) ?? "unknown";
	document.getElementById("usablepps")!.textContent = format(player.pointsPerSec) ?? "unknown";
	buyGoof(0, true);

	// saving
	timeSinceLastSave += deltaTime;
	if (timeSinceLastSave >= 20) {
		save();
		timeSinceLastSave = 0;
	}
	// read only player watch / which is apparently not readonly
	window.player = player;
}, 1000 / 100);
