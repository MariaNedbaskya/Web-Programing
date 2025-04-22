const http = require('http');
const url = require('url');
const querystring = require('querystring');

class App {
  constructor() {
    this.middlewares = [];
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      PATCH: {},
      DELETE: {}
    };
  }

  use(path, middlewareOrRouter) {
    if (typeof path === 'function') {
      this.middlewares.push(path);
    } else {
      if (typeof middlewareOrRouter === 'function') {
        this.middlewares.push((req, res, next) => {
          if (req.url.startsWith(path)) {
            middlewareOrRouter(req, res, next);
          } else {
            next();
          }
        });
      } else {
        for (const method in middlewareOrRouter.routes) {
          for (const routePath in middlewareOrRouter.routes[method]) {
            const fullPath = path + routePath;
            this.routes[method][fullPath] = middlewareOrRouter.routes[method][routePath];
          }
        }
      }
    }
  }

  get(path, handler) {
    this._registerRoute('GET', path, handler);
  }

  post(path, handler) {
    this._registerRoute('POST', path, handler);
  }

  put(path, handler) {
    this._registerRoute('PUT', path, handler);
  }

  patch(path, handler) {
    this._registerRoute('PATCH', path, handler);
  }

  delete(path, handler) {
    this._registerRoute('DELETE', path, handler);
  }

  _registerRoute(method, path, handler) {
    this.routes[method][path] = handler;
  }

  _parseRequest(req) {
    return new Promise((resolve) => {
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      });
      req.on('end', () => {
        body = Buffer.concat(body).toString();
        if (req.headers['content-type'] === 'application/json' && body) {
          try {
            body = JSON.parse(body);
          } catch (e) {
            body = {};
          }
        }
        resolve(body);
      });
    });
  }

  _matchRoute(method, path) {
    const routes = this.routes[method];
    
    if (routes[path]) {
      return { handler: routes[path], params: {} };
    }
    
    for (const routePath in routes) {
      if (routePath.includes(':')) {
        const routeParts = routePath.split('/');
        const pathParts = path.split('/');
        
        if (routeParts.length !== pathParts.length) continue;
        
        const params = {};
        let match = true;
        
        for (let i = 0; i < routeParts.length; i++) {
          if (routeParts[i].startsWith(':')) {
            params[routeParts[i].substring(1)] = pathParts[i];
          } else if (routeParts[i] !== pathParts[i]) {
            match = false;
            break;
          }
        }
        
        if (match) {
          return { handler: routes[routePath], params };
        }
      }
    }
    
    return null;
  }

  _handleRequest(req, res) {
    res.send = (data) => {
      if (!res.getHeader('Content-Type')) {
        res.setHeader('Content-Type', 'text/plain');
      }
      res.end(data);
    };
    
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };
    
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    req.query = parsedUrl.query;

    this._parseRequest(req).then((body) => {
      req.body = body;
      
      const route = this._matchRoute(req.method, path);
      if (route) {
        req.params = route.params;
        
        const applyMiddlewares = (index) => {
          if (index < this.middlewares.length) {
            this.middlewares[index](req, res, () => {
              applyMiddlewares(index + 1);
            });
          } else {
            try {
              route.handler(req, res);
            } catch (error) {
              console.error('Error in route handler:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          }
        };
        
        applyMiddlewares(0);
      } else {
        res.status(404).json({ error: 'Not Found' });
      }
    }).catch(error => {
      console.error('Error parsing request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  }

  listen(port, callback) {
    const server = http.createServer((req, res) => {
      this._handleRequest(req, res);
    });
    
    server.listen(port, callback);
    
    return server;
  }
}

module.exports = App;