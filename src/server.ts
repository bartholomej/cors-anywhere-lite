import 'dotenv/config';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import polka from 'polka';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

enum Errors {
  AUTH_TOKEN_MISSING = 'AUTH_TOKEN_MISSING',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  URL_MISSING = 'URL_MISSING',
  REQUEST_FAILED = 'REQUEST_FAILED',
  PAGE_NOT_FOUND = 'PAGE_NOT_FOUND',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS'
}

enum Endpoint {
  ROOT = '/',
}

polka()
  .get(Endpoint.ROOT, async (req, res) => {
    const url = req.query.url as string;
    const auth = req.headers['authorization'];

    if (!url) {
      return res.end(JSON.stringify({
        name: packageJson.name,
        version: packageJson.version,
        docs: packageJson.homepage,
        links: Object.values(Endpoint)
      }));
    }

    if (AUTH_TOKEN) {
      if (!auth) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          name: packageJson.name, version: packageJson.version, error: {
            code: Errors.AUTH_TOKEN_MISSING
          }
        }));
      }

      if (auth !== `Bearer ${AUTH_TOKEN}`) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          name: packageJson.name,
          version: packageJson.version,
          error: {
            code: Errors.AUTH_TOKEN_INVALID
          }
        }));
      }
    }

    // Ensure proper protocol and validate URL
    let targetUrl: string = '';
    try {
      const parsedUrl = new URL(url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url);
      targetUrl = parsedUrl.href;
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        name: packageJson.name,
        version: packageJson.version,
        error: {
          code: Errors.URL_MISSING
        }
      }));
    }

    try {
      console.log(`Fetching URL: ${targetUrl}`);
      const response = await fetch(targetUrl);

      res.writeHead(response.status, {
        'Content-Type': response.headers.get('content-type') || 'text/plain'
      });

      const data = Buffer.from(await response.arrayBuffer());
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        name: packageJson.name,
        version: packageJson.version,
        error: {
          code: Errors.REQUEST_FAILED,
          message: err instanceof Error ? err.message : String(err)
        },
      }));
    }
  })

  .listen(PORT, () => {
    console.log(`[cors-anywhere-lite] Server is running on http://localhost:${PORT}`);
  });
