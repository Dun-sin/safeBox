export const SET_SETTINGS = 'SET_SETTINGS';
export const ADD_RULE = 'ADD_RULE';
export const EDIT_RULE = 'EDIT_RULE';

export const reducer = (state, action) => {
	switch (action.type) {
		case SET_SETTINGS:
			return {
				...state,
				settings: action.payload,
			};
		case ADD_RULE:
			return {
				...state,
				rules: [...state.rules, action.payload],
			};
		case EDIT_RULE:
			return {
				...state,
				rules: state.rules.map((rule) =>
					rule.name === action.payload.name
						? { ...action.payload.changes }
						: rule,
				),
			};
		case 'INITIALIZE_STATE':
			return action.payload;
		default:
			return state;
	}
};
