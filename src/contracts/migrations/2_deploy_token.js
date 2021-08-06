const PAToken = artifacts.require("./PAToken.sol");

module.exports = function (deployer) {
  
  const name = "Paja Token";
  const symbol = "PAT";
  const initialSupply = 1000000000000000;

  deployer.deploy(PAToken,name,symbol,initialSupply);
};
