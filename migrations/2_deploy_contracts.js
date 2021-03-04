var HumidityContract = artifacts.require("HumidityContract");

module.exports = function(deployer) {
  deployer.deploy(HumidityContract);
};