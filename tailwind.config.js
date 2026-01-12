// idk why this doesn't work

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontSize: {
				'namestamp': 'clamp(1.25rem, 1.0885rem + 0.6891vw, 1.75rem)',
				'title': 'clamp(1.25rem, 1.0885rem + 0.6891vw, 1.75rem)',
				'subtitle': 'clamp(0.875rem, 0.7539rem + 0.5168vw, 1.25rem)',
				'header': 'clamp(1rem, 0.9596rem + 0.1723vw, 1.25rem)',
				'body': 'clamp(0.875rem, 0.8346rem + 0.1723vw, 1rem)',
				'button': 'clamp(1rem, 1vw, 1rem',
				'tag': 'clamp(0.625rem, 0.5846rem + 0.1723vw, 0.75rem)',
			},
		},
	},
	plugins: [],
};
