module.exports = {
	parser: '@typescript-eslint/parser',
	extends: 'airbnb',
	env: {
		'node': true,
		'jasmine': true,
		'jquery': true,
	},
	rules: {
		'no-use-before-define': 0,
		'func-names': 0,
		'prefer-arrow-callback': 0,
		'linebreak-style': ['error', 'windows'],
		'indent': ['error', 4],
		'no-var': 0,
		'max-len': 0,
		'guard-for-in': 0,
		'object-shorthand': 0,
		'no-restricted-syntax': 0,
		'prefer-template': 0,
		'import/no-amd': 0,
		'space-before-function-paren': 0,
		'jsx-a11y/href-no-hash': 'off',
		'jsx-a11y/anchor-is-valid': ['warn', {
			'aspects': ['invalidHref']
		}],
		'import/no-unresolved': 0,
		'import/extensions': 0,
		'curly': ['error', 'multi']
	},
	globals: {
		'browser': false,
		'window': true,
		'document': true
	}
}