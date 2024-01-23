module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-essential'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'quotes': ['error', 'single'],
        // we want to force semicolons
        'semi': ['off', 'never'],
        // we use 4 spaces to indent our code
        'indent': ['error', 4],
        // we want to avoid extraneous spaces
        'no-multi-spaces': ['error'],
    
    }
}
