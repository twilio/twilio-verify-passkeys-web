//@ts-ignore
let formats = ['es', 'cjs', 'umd', 'iife'];

export default formats.map(format => ({
    input: './src/TwilioPasskeys.js',
    output: {
        file: `dist/twilio-verify-passkeys.${format}.js`,
        format,
        name: 'TwilioPasskeys',
    }
}));