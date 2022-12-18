const { adaptController } = require('../adapters/express-controller-adapter');
const { makeCreateClienteController } = require('../factories/create-cliente-controller');
const { makeGetAllClientesController } = require('../factories/get-all-clientes-controller');
const { makeGetClienteByCpfController } = require('../factories/get-cliente-by-cpf-controller');
const { makeUpdateClienteController } = require('../factories/update-cliente-controller');

function setupClientesRoute(app) {
  app.post('/clientes', adaptController(makeCreateClienteController()));
  app.get('/clientes', adaptController(makeGetAllClientesController()));
  app.get('/clientes/:cpfCliente', adaptController(makeGetClienteByCpfController()));
  app.put('/clientes/:cpfCliente', adaptController(makeUpdateClienteController()));
}

module.exports = { setupClientesRoute };
