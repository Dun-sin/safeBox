export function calculateIncomeAllocation(totalIncome, rule) {
	const allocation = {};
	rule.segments.forEach((segment) => {
		allocation[segment.label] = (totalIncome * (segment.amount / 100)).toFixed(
			2,
		);
	});
	return allocation;
}

export function isEmptyObject(obj) {
	return Object.keys(obj).length === 0;
}

export function calculateLabel(segments) {
	let label = '';
	segments.forEach((segment, index) => {
		label += segment.amount * 100;
		if (index < segments.length - 1) {
			label += '/';
		}
	});
	return `${label} Rule`;
}

export function calculateMaxAmount(segments) {
	let amount = 0;
	segments.forEach((segments, index) => {
		amount += segments.amount;
	});

	return amount;
}

export async function saveSetting(db, key, value) {
	await db.settings.upsert({ key, value });
}

export async function getSetting(key) {
	const setting = await db.settings.findOne(key).exec();
	return setting ? setting.value : null;
}

const regex = /^-?(\d*\.\d+|\d+\.\d*|\d+)$/;
export function isConvertibleToNumber(str) {
	return regex.test(str);
}
