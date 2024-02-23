module.exports = {
	parser: '@babel/eslint-parser',
	plugins: ['react', 'react-native'],
	env: {
		'react-native/react-native': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-native/all',
	],
};
