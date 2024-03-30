export function format(x: number) {
	if (x < 0.0000000001) {
		return "0"
	} if (x < 0.1) {
		return "1/" + (x ** -1).toFixed(2)
	} if (x < 1000) {
		return x.toFixed(2)
	} if (x < 100000) {
		return x.toFixed(1)
	} if (x < 1000000) {
		return x.toFixed(0)
	} if (x >= 1000000) {
		let log10x = Math.floor(Math.log10(x))
		let xoverl10x = x / (10 ** log10x)
		if (xoverl10x >= 10)
			return ((xoverl10x / 10).toFixed(2) + "e" + ((log10x + 1)))
		return ((xoverl10x).toFixed(2) + "e" + ((log10x)))
	}
}