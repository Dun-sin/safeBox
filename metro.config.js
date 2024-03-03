// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */

// const config = {
// 	...,
// 	transformer: {
// 		getTransformOptions: async () => ({
// 			transform: {
// 				experimentalImportSupport: false,
// 				inlineRequires: true,
// 			},
// 		}),
// 	},
// };

module.exports = getDefaultConfig(__dirname);
