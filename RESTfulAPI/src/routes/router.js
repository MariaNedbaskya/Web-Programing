class Router {
    constructor() {
      this.routes = {
        GET: {},
        POST: {},
        PUT: {},
        PATCH: {},
        DELETE: {}
      };
    }
  
    use(path, router) {
      for (const method in router.routes) {
        for (const routePath in router.routes[method]) {
          const fullPath = path + routePath;
          this.routes[method][fullPath] = router.routes[method][routePath];
        }
      }
    }
  
    get(path, handler) {
      this.routes.GET[path] = handler;
    }
  
    post(path, handler) {
      this.routes.POST[path] = handler;
    }
  
    put(path, handler) {
      this.routes.PUT[path] = handler;
    }
  
    patch(path, handler) {
      this.routes.PATCH[path] = handler;
    }
  
    delete(path, handler) {
      this.routes.DELETE[path] = handler;
    }
  }
  
  module.exports = { Router };