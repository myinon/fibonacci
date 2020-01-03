const Fibonacci = (function () {
	const _O = Object.freeze([[1n, 1n], [1n, 0n]]);

	function matmul(fb, m1, m2) {
		let a = (m1[0][0] * m2[0][0]) + (m1[0][1] * m2[1][0]),
			b = (m1[0][0] * m2[0][1]) + (m1[0][1] * m2[1][1]),
			c = (m1[1][0] * m2[0][0]) + (m1[1][1] * m2[1][0]),
			d = (m1[1][0] * m2[0][1]) + (m1[1][1] * m2[1][1]);

		fb._M[0][0] = a;
		fb._M[0][1] = b;
		fb._M[1][0] = c;
		fb._M[1][1] = d;
	}

	function matpow(fb, n) {
		if (n > 1n) {
			matpow(fb, n / 2n);
			matmul(fb, fb._M, fb._M);
		}

		if (n % 2n === 1n) {
			matmul(fb, fb._M, _O);
		}
	}

	class Fibonacci {
		constructor(position = 0n) {
			this.position = BigInt(position);
			if (this.position < 0n) {
				this.position = 0n;
			}

			this._M = [[1n, 0n], [0n, 1n]];
			Object.defineProperties(this, {
				position: {
					configurable: false,
					enumerable: true,
					writable: false
				},
				_M: {
					configurable: false,
					enumerable: false,
					writable: false
				}
			});
		}

		calculate() {
			if (typeof this.result === "undefined") {
				matpow(this, this.position - 1n);
				this.result = this._M[0][0];
				Object.defineProperty(this, "result", {
					configurable: false,
					enumerable: true,
					writable: false
				});
			}
			return this.result;
		}
	}

	Object.defineProperty(this, "_O", {
		configurable: false,
		enumerable: false,
		writable: false
	});

	return Fibonacci;
}());
