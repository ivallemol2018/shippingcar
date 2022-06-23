const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/*", { target: "http://localhost:8080/" })
  );
  app.use(
    createProxyMiddleware("/api/productos/*", { target: "http://localhost:8080/" })
  );
  app.use(
    createProxyMiddleware("/api/carrito/*", { target: "http://localhost:8080/" })
  );   
  app.use(
    createProxyMiddleware("/api/carrito/*/products", { target: "http://localhost:8080/" })
  );  
  app.use(
    createProxyMiddleware("/api/carrito/*/products/*", { target: "http://localhost:8080/" })
  );    
};