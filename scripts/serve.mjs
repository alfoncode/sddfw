import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('../', import.meta.url)));
const root = process.argv.includes('--dist') ? resolve(projectRoot, 'dist') : projectRoot;
const port = Number(process.env.PORT ?? 4173);
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed');
    return;
  }

  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    // Serve the landing and its public assets only, never repository internals.
    if (pathname !== '/' && pathname !== '/index.html' && !pathname.startsWith('/assets/')) {
      response.writeHead(404).end('Not found');
      return;
    }
    const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!file.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 400).end('Unable to serve this file');
  }
});

server.on('error', (error) => {
  console.error(`Could not start the preview: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`SDDFW landing → http://localhost:${port}`);
});
