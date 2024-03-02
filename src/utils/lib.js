import AsyncStorage from '@react-native-async-storage/async-storage';

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

const regex = /^-?(\d*\.\d+|\d+\.\d*|\d+)$/;
export function isConvertibleToNumber(str) {
	return regex.test(str);
}

export async function storeData(value) {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem('data', jsonValue);
	} catch (error) {
		console.error(error);
	}
}

const initialState = {
	rules: [
		{
			name: 'Rule 1',
			label: '35/25/40 Rule',
			segments: [
				{ label: 'Save', amount: 0.35, color: '#177AD5' },
				{ label: 'Invest', amount: 0.25, color: '#79D2DE' },
				{ label: 'Spend', amount: 0.4, color: '#ED6665' },
			],
		},
		{
			name: 'Rule 2',
			label: '40/30/30 Rule',
			segments: [
				{ label: 'Vacation', amount: 0.4, color: '#F53D3D' },
				{ label: 'Education', amount: 0.3, color: '#79D2DE' },
				{ label: 'Entertainment', amount: 0.3, color: '#ED6665' },
			],
		},
		{
			name: 'Rule 3',
			label: '50/20/30 Rule',
			segments: [
				{ label: 'Emergency Fund', amount: 0.5, color: '#610505' },
				{ label: 'Investment', amount: 0.2, color: '#79D2DE' },
				{ label: 'Personal Development', amount: 0.3, color: '#177AD5' },
			],
		},
	],
	settings: {},
};

export const getData = async () => {
	try {
    const jsonValue = await AsyncStorage.getItem('data');
		const db = jsonValue !== 'null' ? JSON.parse(jsonValue) : initialState;

		return db;
	} catch (e) {
		console.error(error);
	}
};

export const createSentenceFromSegments = (rule) => {
	const labels = rule.segments.map((segment) => segment.label);
	return labels.join(', ');
};
