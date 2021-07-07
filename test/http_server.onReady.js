const fetch = require('node-fetch');
const httpServer = require('../http_server');

describe('httpServer.onReady', () => {
  it('should connect to http server', () => {
    return httpServer.onReady(() => fetch(httpServer.getLocalhostURL()));
  });
 });

 after(() => httpServer.close());