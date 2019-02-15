require('babel-register')
require('babel-polyfill')

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "172.16.24.65" // Match any network id
    }
  }
};
