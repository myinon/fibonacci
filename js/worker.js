self.importScripts("fibonacci.js");

self.addEventListener("message", function (e) {
	const { locale, type, value } = e.data;

	if (type === "calculate") {
		try {
			const fb = new Fibonacci(value);
			fb.calculate();

			self.postMessage({
				type: "result",
				value: fb.result.toLocaleString(locale)
			});
		} catch (x) {
			self.postMessage({ type: "error", value: x.message });
		}
	}
}, { passive: false });
