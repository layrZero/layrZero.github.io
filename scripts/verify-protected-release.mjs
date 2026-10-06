import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = path => fs.readFileSync(path, 'utf8');
const root = 'docs/products/imc/';
const brokers = read(root + 'connect-brokers/brokers/README.md');
for (const broker of ['Dhan','Fyers','Upstox','Zerodha']) assert.ok(brokers.includes('[' + broker + ']'));
assert.ok(!brokers.includes('[Angel'));
assert.ok(!fs.existsSync(root + 'connect-brokers/brokers/angelone.md'));
assert.ok(fs.existsSync('docs - Deprecated/production-disabled-brokers/angelone.md'));
const config = read('docusaurus.config.ts');
assert.ok(config.includes("'/docs/products/imc/connect-brokers/brokers/angelone'"));
assert.ok(config.includes("to: '/docs/products/imc/releases/protected-order-release'"));
const protectedDoc = read(root + 'api-documentation/v1/protected-orders.md');
for (const endpoint of ['placeprotectedorder','protectedorderbook','modifyprotectedorder','cancelprotectedorder','recoverprotectedorder']) assert.ok(protectedDoc.includes('/api/v1/' + endpoint));
for (const file of ['protected-orders','ddpi-status','dhan-super-orders','options-and-gtt']) {
 const text = read(root + 'api-documentation/v1/' + file + '.md');
 for (const match of text.matchAll(/```json\n([\s\S]*?)```/g)) JSON.parse(match[1]);
}
const sitemap = read('build/sitemap.xml');
assert.ok(sitemap.includes('/connect-brokers/brokers/dhan'));
assert.ok(!sitemap.includes('/connect-brokers/brokers/angelone'));
assert.ok(!sitemap.includes('production-disabled-brokers'));
for (const path of ['products/imc/connect-brokers/brokers/angelone', 'connect-brokers/angel', 'connect-brokers/brokers/angel', 'connect-brokers/angelone', 'connect-brokers/brokers/angelone']) {
 const files = ['build/docs/' + path + '/index.html', 'build/docs/' + path + '.html'];
 const file = files.find(file => fs.existsSync(file));
 assert.ok(file, 'Missing retired URL redirect: ' + path);
 assert.ok(read(file).includes('/docs/products/imc/releases/protected-order-release'));
}
console.log('Protected-release routes, JSON examples, broker list, archive, redirect and sitemap checks passed.');

const ddpiDoc = read(root + "api-documentation/v1/ddpi-status.md");
assert.ok(ddpiDoc.includes("POST `/api/v1/ddpistatus`"));
for (const text of [ddpiDoc, protectedDoc]) {
 assert.ok(!/\/api\/v1\/(dhan|upstox|zerodha|fyers|\{broker\})\/ddpistatus/.test(text));
 assert.ok(!/ddpistatus\(["']/.test(text));
}

const gttDoc = read(root + "api-documentation/v1/options-and-gtt.md");
for (const broker of ["Dhan", "Upstox", "Zerodha", "FYERS"]) assert.ok(gttDoc.includes("### " + broker));

assert.ok(protectedDoc.includes('a995f3e'));
assert.ok(protectedDoc.includes('Successful and failed placement responses are immutable'));
assert.ok(read(root + 'broker-setup-and-local-deployment.md').includes('toggle_config.py --dev'));
