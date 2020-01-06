const jsbi = !("BigInt" in self);

if (!jsbi) {
	self.importScripts("fibonacci.js");
} else {
	self.importScripts("jsbi/jsbi.mjs");
	self.importScripts("jsbi/jsbi_fibonacci.js");
}

self.addEventListener("message", function (e) {
	const { locale, type, value } = e.data;

	if (type === "calculate") {
		try {
			const fb = new Fibonacci(value);
			fb.calculate();

			self.postMessage({
				type: "result",
				value: jsbi ?
					fb.result.toString() :
					fb.result.toLocaleString(locale)
			});
		} catch (x) {
			self.postMessage({ type: "error", value: x.message });
		}
	}
}, { passive: false });
