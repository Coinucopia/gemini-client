"use strict";

const findSymbol = require("./find-symbol");

module.exports = function ({ api }) {
	return function normalizeQuantity(orderSpec) {
		let { quantity, rate } = orderSpec;

		if (quantity.targetCurrency == null) {
			return {
				rate: rate,
				quantity: quantity.baseValue
			};
		} else {
			if (quantity.baseValue.currency === rate.currency) {
				return {
					rate: rate,
					quantity: {
						currency: quantity.targetCurrency,
						amount: quantity.baseValue.amount.div(rate.amount)
					}
				};
			} else {
				throw new Error("Currency of amount to buy/sell must match currency of the target rate");
			}
		}
	}

};
