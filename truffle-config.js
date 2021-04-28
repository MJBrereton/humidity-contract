module.exports = {
  networks: {
    development: {
      // currently deploys contracts to local host
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    }
  }
};
