const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const brokerDir = path.join(root, 'docs', 'products', 'imc', 'connect-brokers', 'brokers');
const deprecatedDir = path.join(root, 'docs - Deprecated', 'production-disabled-brokers');

const productionBrokers = ['angelone.md', 'fyers.md', 'upstox.md', 'zerodha.md'];
const disabledBrokers = [
  '5paisa-xts.md', '5paisa.md', 'aliceblue.md', 'compositedge.md', 'dhan-sandbox.md',
  'dhan.md', 'firstock.md', 'flattrade.md', 'groww.md', 'iifl-xts.md',
  'indiabulls-securities.md', 'indmoney.md', 'kotak-securities.md', 'paytm.md',
  'pocketful.md', 'shoonya.md', 'tradejini.md', 'wisdom-capital.md', 'zebu.md',
];

test('public broker index contains only production brokers', () => {
  const files = fs.readdirSync(brokerDir).filter((file) => file.endsWith('.md')).sort();
  assert.deepEqual(files, ['README.md', ...productionBrokers].sort());
  for (const file of disabledBrokers) {
    assert.equal(fs.existsSync(path.join(brokerDir, file)), false, `${file} must not be public`);
    assert.equal(fs.existsSync(path.join(deprecatedDir, file)), true, `${file} must be archived`);
  }
});

test('public source has no inherited OpenAlgo references', () => {
  const roots = [path.join(root, 'docs'), path.join(root, 'static')];
  const offenders = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === ' - Deprecated') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(md|mdx|ts|tsx|js|txt|json|ads)$/i.test(entry.name)) {
        const value = fs.readFileSync(full, 'utf8').toLowerCase();
        const forbidden = [
          'openalgo', 'docs.openalgo.in', 'amibroker', 'metatrader', 'mql5',
          '5paisa', 'aliceblue', 'compositedge', 'dhan', 'firstock', 'flattrade',
          'groww', 'iifl', 'indiabulls', 'indmoney', 'kotak', 'paytm', 'pocketful',
          'shoonya', 'tradejini', 'wisdom capital', 'zebu', 'mcp',
        ];
        if (forbidden.some((term) => value.includes(term))) offenders.push(full);
      }
    }
  }
  roots.forEach(walk);
  assert.deepEqual(offenders, []);
});

test('redirect configuration covers retained brokers and not disabled brokers', () => {
  const config = fs.readFileSync(path.join(root, 'docusaurus.config.ts'), 'utf8');
  for (const slug of ['angelone', 'fyers', 'upstox', 'zerodha']) {
    assert.match(config, new RegExp(`connect-brokers/${slug}`));
    assert.match(config, new RegExp(`connect-brokers/brokers/${slug}`));
  }
  for (const slug of ['5paisa', 'aliceblue', 'compositedge', 'dhan', 'kotak-securities', 'zebu']) {
    assert.doesNotMatch(config, new RegExp(`connect-brokers(?:/brokers)?/${slug}`));
  }
});
