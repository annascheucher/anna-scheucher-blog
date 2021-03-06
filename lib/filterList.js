import _ from "lodash";
import { QAPageJsonld } from "next-seo";
export function filterList(q, list) {
	const result = list.filter((item) => {
		const keys = _.keys(item);
		let match = false;
		for (const key of keys) {
			const value = item[key];
			if (typeof value == "string") {
				const result = value.includes(q);
				if (result) {
					match = result;
				} else {
					continue;
				}
			} else if (typeof value == "object") {
				// Checking arrays for values
				if (Array.isArray(value)) {
					for (const item of value) {
						const result = item.includes(q);
						if (result) {
							match = result;
						} else {
							continue;
						}
					}
				}

				// Checking object values
				if (isObject(value)) {
					const keys = _.keys(value);
					for (const key of keys) {
						const keyValue = value[key];
						const result = keyValue.includes(q);
						if (result) {
							match = result;
						} else {
							continue;
						}
					}
				}
			}
		}
		return match;
	});
	return result;
}

const isObject = (obj) => {
	return Object.prototype.toString.call(obj) === "[object Object]";
};
