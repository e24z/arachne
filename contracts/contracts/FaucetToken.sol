// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FaucetToken is ERC20 {
    uint256 public constant FAUCET_AMOUNT = 100 * (10**18);
    mapping(address => bool) private _hasUsedFaucet;

    constructor() ERC20("Arachne", "ARCH") {
        _mint(msg.sender, 1000000 * (10**decimals()));
    }

    function faucet() external {
        require(!_hasUsedFaucet[msg.sender], "Faucet already used");
        _hasUsedFaucet[msg.sender] = true;
        _mint(msg.sender, FAUCET_AMOUNT);
    }
}