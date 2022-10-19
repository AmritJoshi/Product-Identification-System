const prodidentify = artifacts.require("prodidentify");

module.exports = function(deployer) {
  deployer.deploy(prodidentify);
};