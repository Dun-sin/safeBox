export const RuleSchema = {
	version: 0,
	title: 'rule',
	description: 'A simple rule schema',
	primaryKey: 'name', // <= the primary key is must
	type: 'object',
	properties: {
		name: {
			type: 'string',
			maxLength: 100, // <- the primary key must have set maxLength
		},
		label: {
			type: 'string',
		},
		segments: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					label: {
						type: 'string',
					},
					amount: {
						type: 'number',
					},
					color: {
						type: 'string',
					},
				},
			},
		},
	},
};
