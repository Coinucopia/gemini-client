"use strict";

const validSymbols = require("./valid-symbols");

/*
Symbol format: CCY1CCY2, where CCY1 = quantity and CCY2 = price
               BTC USD         BTC                 USD
	Like in: 20 CCY1 @ 50 CCY2
	         20 BTC  @ 50 USD
*/

module.exports = function findSymbol(quantityCurrency, priceCurrency) {
	let symbol1 = quantityCurrency.toLowerCase() + priceCurrency.toLowerCase();
	let symbol2 = priceCurrency.toLowerCase() + quantityCurrency.toLowerCase();

	if (validSymbols.includes(symbol1)) {
		return {
			symbol: symbol1,
			invert: false
		};
	} else if (validSymbols.includes(symbol2)) {
		return {
			symbol: symbol2,
			invert: true
		};
	} else {
		throw new Error(`Invalid currency pair: ${quantityCurrency} -> ${priceCurrency} is not supported`);
	}
};
