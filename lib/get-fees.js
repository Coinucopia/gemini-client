"use strict";

const Promise = require("bluebird");

module.exports = function ({ client }) {
	/* We cache fees indefinitely, because the program is never long-running, and so the data is thrown away after a few seconds due to program termination anyway. We cache the *Promise* that'll eventually resolve to the fee data, since that'll give us automagical queueing for concurrent attempts for free, as each attempt will be waiting for the same Promise. */
	let fees;

	return function getFees() {
		return Promise.try(() => {
			if (fees == null) {
				fees = client.getMyNotionalVolume();
			}
	
			return fees;
		});
	}
};
