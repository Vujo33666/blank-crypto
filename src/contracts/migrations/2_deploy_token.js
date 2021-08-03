const PAToken = artifacts.require("./PAToken.sol");

module.exports = function (deployer) {
  
  const name = "Paja Token";
  const symbol = "PAT";
  const initialSupply = 100000000;

  deployer.deploy(PAToken,name,symbol,initialSupply);
};
