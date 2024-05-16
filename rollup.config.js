import pkg from './package.json' assert { type: "json" };

let formats = ['es', 'cjs', 'umd', 'iife'];

export default formats.map(format => ({
    input: './src/TwilioPasskeys.js',
    output: {
        file: `dist/${pkg.name}.${format}.js`,
        format,
        name: 'TwilioPasskeys',
        sourcemap: true
    }
}));