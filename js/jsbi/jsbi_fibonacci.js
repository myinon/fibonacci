const Fibonacci = (function () {
	const _ZERO = JSBI.BigInt(0),
		_ONE = JSBI.BigInt(1),
		_TWO = JSBI.BigInt(2),
		_O = Object.freeze([[_ONE, _ONE], [_ONE, _ZERO]]);

	function matmul(fb, m1, m2) {
		let a = JSBI.add(JSBI.multiply(m1[0][0], m2[0][0]), JSBI.multiply(m1[0][1], m2[1][0])),
			b = JSBI.add(JSBI.multiply(m1[0][0], m2[0][1]), JSBI.multiply(m1[0][1], m2[1][1])),
			c = JSBI.add(JSBI.multiply(m1[1][0], m2[0][0]), JSBI.multiply(m1[1][1], m2[1][0])),
			d = JSBI.add(JSBI.multiply(m1[1][0], m2[0][1]), JSBI.multiply(m1[1][1], m2[1][1]));

		fb._M[0][0] = a;
		fb._M[0][1] = b;
		fb._M[1][0] = c;
		fb._M[1][1] = d;
	}

	function matpow(fb, n) {
		if (JSBI.greaterThan(n, _ONE)) {
			matpow(fb, JSBI.divide(n, _TWO));
			matmul(fb, fb._M, fb._M);
		}

		if (JSBI.equal(JSBI.remainder(n, _TWO), _ONE)) {
			matmul(fb, fb._M, _O);
		}
	}

	class Fibonacci {
		constructor(position = _ZERO) {
			this.position = JSBI.BigInt(position);
			if (JSBI.lessThan(this.position, _ZERO)) {
				this.position = _ZERO;
			}

			this._M = [[_ONE, _ZERO], [_ZERO, _ONE]];
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
				matpow(this, JSBI.subtract(this.position, _ONE));
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
