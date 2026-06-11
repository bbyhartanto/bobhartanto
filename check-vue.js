const fs = require('fs');
const compiler = require('./node_modules/@vue/compiler-dom/dist/compiler-dom.cjs.js');
const content = fs.readFileSync('app/pages/index.vue', 'utf-8');
try {
  compiler.parse(content);
  console.log('Template is valid!');
} catch (e) {
  console.log(e.message);
  if (e.loc) {
    console.log(`Error at line ${e.loc.start.line}, column ${e.loc.start.column}`);
  }
}
