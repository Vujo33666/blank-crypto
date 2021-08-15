// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract PAToken is ERC20{
    uint256 private initialSupply;
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) ERC20(_name, _symbol){
        initialSupply=_initialSupply;
        _mint(msg.sender, _initialSupply*10**decimals());
    }

    function decimals() public view override returns (uint8) {
		return 8;
	}

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

}