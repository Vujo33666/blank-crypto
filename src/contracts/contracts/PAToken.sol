// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract PAToken is ERC20{
    uint256 private initialSupply;
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) ERC20(_name, _symbol){
        initialSupply=_initialSupply;
        _mint(msg.sender, _initialSupply);
    }
}