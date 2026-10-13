const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const brokerDir = path.join(root, 'docs', 'products', 'imc', 'connect-brokers', 'brokers');
const deprecatedDir = path.join(root, 'docs - Deprecated', 'production-disabled-brokers');
const apiDir = path.join(root, 'docs/products/imc/api-documentation/v1');

test('every public method has an independent page, method section and index link', () => {
  const contract = JSON.parse(fs.readFileSync(path.join(root, 'static/imc-endpoint-contract.json'), 'utf8'));
  const mapping = JSON.parse(fs.readFileSync(path.join(root, 'static/imc-endpoint-pages.json'), 'utf8')).pages;
  const pair = row => `${row.method} ${row.path}`;
  assert.deepEqual(mapping.map(pair).sort(), contract.public.map(pair).sort());
  assert.equal(new Set(mapping.map(pair)).size, 52);
  assert.equal(new Set(mapping.map(row => row.page)).size, 51);
  const index = fs.readFileSync(path.join(apiDir, 'README.md'), 'utf8');
  const reference = fs.readFileSync(path.join(apiDir, 'complete-endpoint-reference.md'), 'utf8');
  const linksTo = (markdown, page) => [...markdown.matchAll(/\]\(([^)]+)\)/g)].some((match) => {
    const target = match[1].split(/[?#]/, 1)[0];
    return !/^[a-z]+:/i.test(target) && path.resolve(apiDir, target) === path.resolve(apiDir, page);
  });
  const owners = new Map();
  for (const row of mapping) {
    assert.ok(!row.page.includes('..') && row.page.endsWith('.md'));
    assert.ok(!['complete-endpoint-reference.md', 'options-and-gtt.md', 'protected-orders.md'].includes(row.page));
    const text = fs.readFileSync(path.join(apiDir, row.page), 'utf8');
    assert.ok(text.includes(`## ${row.method} \`${row.path}\``), `missing method section: ${pair(row)}`);
    assert.ok(linksTo(index, row.page), `missing index link: ${row.page}`);
    assert.ok(linksTo(reference, row.page), `missing reference link: ${row.page}`);
    if (owners.has(row.page)) assert.equal(row.path, owners.get(row.page), 'unrelated endpoints must not share pages');
    owners.set(row.page, row.path);
  }
  assert.match(fs.readFileSync(path.join(root, 'sidebars.ts'), 'utf8'), /dirName:\s*['"]products\/imc\/api-documentation\/v1['"]/);
});

test('every dedicated endpoint page is filed under its API category', () => {
  const pages = JSON.parse(fs.readFileSync(path.join(root, 'static/imc-endpoint-pages.json'), 'utf8')).pages;
  const accounts = new Set([
    'analyzer-status', 'analyzer-toggle', 'brokers-active', 'ddpi-status', 'funds', 'holdings',
    'margin', 'orderbook', 'ping', 'pnl-symbols', 'positionbook', 'strategy-analytics',
    'syntheticfuture', 'tradebook',
  ]);
  const data = new Set([
    'depth', 'expiry', 'history', 'instruments', 'intervals', 'market-holidays', 'market-timings',
    'multiquotes', 'optionchain', 'optiongreeks', 'optionsymbol', 'quotes', 'search', 'symbol', 'ticker',
  ]);
  for (const page of new Set(pages.map((row) => row.page))) {
    const name = path.basename(page, '.md');
    const expected = name === 'chart' ? '.' : accounts.has(name) ? 'accounts-api' : data.has(name) ? 'data-api' : 'orders-api';
    assert.equal(path.dirname(page), expected, `${page} must be filed under ${expected}`);
  }
});

test('new independent pages contain complete examples and source-specific contracts', () => {
  const oldDirs = ['accounts-api/', 'orders-api/', 'data-api/'];
  const rows = JSON.parse(fs.readFileSync(path.join(root, 'static/imc-endpoint-pages.json'), 'utf8')).pages;
  for (const page of new Set(rows.map(r => r.page).filter(p => !oldDirs.some(d => p.startsWith(d)) && p !== 'ddpi-status.md'))) {
    const text = fs.readFileSync(path.join(apiDir, page), 'utf8');
    for (const section of ['Parameters', 'Request example', 'Python SDK', 'Response and errors', 'Modes, capabilities and usage']) {
      assert.ok(text.includes(`### ${section}`), `${page}: ${section}`);
    }
    assert.ok(text.includes('(request-json-validation.md)'));
    assert.ok(text.includes('Source handler:'));
    for (const match of text.matchAll(/```json\s*([\s\S]*?)```/g)) JSON.parse(match[1]);
  }
});

const productionBrokers = ['dhan.md', 'fyers.md', 'upstox.md', 'zerodha.md'];
const disabledBrokers = [
  '5paisa-xts.md', '5paisa.md', 'aliceblue.md', 'compositedge.md', 'dhan-sandbox.md',
  'angelone.md', 'firstock.md', 'flattrade.md', 'groww.md', 'iifl-xts.md',
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
          '5paisa', 'aliceblue', 'compositedge', 'firstock', 'flattrade',
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
  for (const slug of ['dhan', 'fyers', 'upstox', 'zerodha']) {
    assert.match(config, new RegExp(`connect-brokers/${slug}`));
    assert.match(config, new RegExp(`connect-brokers/brokers/${slug}`));
  }
  for (const slug of ['5paisa', 'aliceblue', 'compositedge', 'kotak-securities', 'zebu']) {
    assert.doesNotMatch(config, new RegExp(`connect-brokers(?:/brokers)?/${slug}`));
  }
});

test('complete endpoint reference covers the current source snapshot', () => {
  const contract = JSON.parse(fs.readFileSync(path.join(root, 'static', 'imc-endpoint-contract.json'), 'utf8'));
  const pairs = new Set(contract.public.map((row) => `${row.method} ${row.path}`));
  assert.equal(pairs.size, 52);
  const reference = fs.readFileSync(path.join(root, 'docs/products/imc/api-documentation/v1/complete-endpoint-reference.md'), 'utf8');
  for (const row of contract.public) {
    assert.ok(reference.includes(`${row.method} \`${row.path}\``), `${row.method} ${row.path}`);
  }
  const discovery = contract.public.find((row) => row.path === '/api/v1/brokers/active');
  assert.match(discovery.authentication, /Authorization/);
});

test('public JSON examples contain no forbidden documentation fields', () => {
  function inspect(value) {
    if (Array.isArray(value)) value.forEach(inspect);
    else if (value && typeof value === 'object') {
      for (const [key, nested] of Object.entries(value)) {
        assert.notEqual(key.trim().toLowerCase(), 'docs');
        inspect(nested);
      }
    }
  }
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.mdx?$/.test(entry.name)) {
        const text = fs.readFileSync(full, 'utf8');
        for (const match of text.matchAll(/```json\s*([\s\S]*?)```/g)) {
          // Some existing narrative examples are fragments rather than JSON.
          let body;
          try { body = JSON.parse(match[1]); } catch { continue; }
          inspect(body);
        }
      }
    }
  }
  walk(path.join(root, 'docs/products/imc/api-documentation/v1'));
});
