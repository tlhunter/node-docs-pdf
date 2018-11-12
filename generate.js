#!/usr/bin/env node

const fs = require('fs');
const pdf = require('html-pdf');

const input = process.argv[2];
const version = process.argv[3];

if (!input || !version) {
    throw new Error('Usage: generate.js <filename.html> <version>');
}

console.log(`BUILD DOCS FOR ${input}`);

const html = fs.readFileSync(input, 'utf8');

const options = {
    format: 'Letter',
    orientation: 'portrait',
    border: '0.5in',
    base: `file://${__dirname}/`,
    timeout: 10 * 60 * 1000
};

pdf.create(html, options).toFile(`./node-${version}-docs.pdf`, function(err, res) {
    if (err) throw err;
    console.log(res); // { filename: '/app/businesscard.pdf' }
});
