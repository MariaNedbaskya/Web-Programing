const http = require('http');
const url = require('url');
const querystring = require('querystring');

class App {
  constructor() {
    this.middlewares = [];
    this.routes = {
      GET: [],
      POST: [],
      PUT: [],
      PATCH: [],
      DELETE: []
    };
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  get(path, handler) {
    this.routes.GET.push({ path, handler });
  }

  post(path, handler) {
    this.routes.POST.push({ path, handler });
  }

  put(path, handler) {
    this.routes.PUT.push({ path, handler });
  }

  patch(path, handler) {
    this.routes.PATCH.push({ path, handler });
  }

  delete(path, handler) {
    this.routes.DELETE.push({ path, handler });
  }

  async handleRequest(req, res) {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;
    const method = req.method;

    req.query = querystring.parse(parsedUrl.query);
    req.params = {};

    res.send = (data) => {
      if (typeof data === 'object') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.end(data);
      }
    };

    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };

    res.status = (code) => {
      res.statusCode = code;
      return res;
    };

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        const body = await this.parseBody(req);
        req.body = body;
      } catch (err) {
        res.status(400).json({ error: 'Invalid request body' });
        return;
      }
    }

    try {
      for (const middleware of this.middlewares) {
        await new Promise((resolve, reject) => {
          middleware(req, res, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const routes = this.routes[method] || [];
    const route = routes.find(route => this.matchRoute(route.path, path, req));

    if (route) {
      try {
        await route.handler(req, res);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  }

  matchRoute(routePath, requestPath, req) {
    const routeParts = routePath.split('/');
    const requestParts = requestPath.split('/');

    if (routeParts.length !== requestParts.length) {
      return false;
    }

    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const requestPart = requestParts[i];

      if (routePart.startsWith(':')) {
        const paramName = routePart.slice(1);
        params[paramName] = requestPart;
      } else if (routePart !== requestPart) {
        return false;
      }
    }

    req.params = params;
    return true;
  }

  parseBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          if (req.headers['content-type'] === 'application/json') {
            resolve(JSON.parse(body));
          } else {
            resolve(body);
          }
        } catch (err) {
          reject(err);
        }
      });
      req.on('error', reject);
    });
  }

  listen(port, callback) {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(port, callback);

    return server;
  }
}

module.exports = () => new App();