const VujoBank = artifacts.require("./VujoBank");

module.exports = function (deployer) {
  deployer.deploy(VujoBank);
};
