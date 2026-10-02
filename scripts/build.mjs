import { cp, mkdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await mkdir(output, { recursive: true });
await cp(new URL('index.html', root), new URL('index.html', output));
await cp(new URL('assets/', root), new URL('assets/', output), { recursive: true });
console.log('Built the SDDFW landing in dist/ (no runtime dependencies).');
