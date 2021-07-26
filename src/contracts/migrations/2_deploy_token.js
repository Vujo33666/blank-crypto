const PAToken = artifacts.require("./PAToken.sol");

module.exports = function (deployer) {
  deployer.deploy(PAToken);
};
