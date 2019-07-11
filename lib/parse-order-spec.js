"use strict";

const BigNumber = require("bignumber.js");

const { ParsingError } = require("./errors");

/* TODO: Annotate parsing errors with the context in which the error occurred, for clearer error messages? Eg. "exchange rate", "amount to purchase" */

function isNumeric(text) {
	return text.match(/^[0-9]+(?:\.[0-9]+)?$/);
}

function parseCurrency(value) {
	if (!["BTC", "USD", "BCH", "ETH"].includes(value)) {
		throw new ParsingError(`Unrecognized currency - supported options are USD, BTC, BCH, ETH`, { input: value });
	} else {
		return value;
	}
}

function parseValue(spec) {
	let flatString = spec.join(" ");

	if (spec.length < 2) {
		throw new ParsingError("Value must include both a currency symbol and a numeric value", { input: flatString });
	} else if (spec.length > 2) {
		throw new ParsingError(`Could not understand the specified value, try this format instead: "500 USD"`, { input: flatString });
	} else if (!isNumeric(String(spec[0]))) {
		throw new ParsingError(`The 'amount' part of the value must be numeric`, { input: spec[0] });
	} else {
		return {
			currency: parseCurrency(spec[1]),
			amount: new BigNumber(spec[0])
		}
	}
}

function parseAmount(spec) {
	let flatString = spec.join(" ");

	if (spec.length < 2) {
		throw new ParsingError("Amount must include at least a currency symbol and a numberic value", { input: flatString });
	} else if (spec.length !== 2 && spec.length !== 4 && (spec.length === 4 && spec[2] !== "in")) {
		throw new ParsingError("Amount to buy/sell must be in either of these two formats: '500 BTC', or '500 USD in BTC'", { input: flatString });
	} else if (spec.length === 2) {
		return {
			baseValue: parseValue(spec)
		};
	} else if (spec.length === 4) {
		return {
			baseValue: parseValue(spec.slice(0, 2)),
			targetCurrency: parseCurrency(spec[3])
		};
	} else {
		throw new Error("This should never happen");
	}
}

module.exports = function parseOrderSpec(spec) {
	let atPosition = spec.indexOf("@");

	if (atPosition === -1 || atPosition === 0 || atPosition === (spec.length - 1)) {
		throw new ParsingError("Must specify both an amount and a rate", { input: spec });
	}

	return {
		quantity: parseAmount(spec.slice(0, atPosition)),
		rate: parseValue(spec.slice(atPosition + 1))
	};
};
