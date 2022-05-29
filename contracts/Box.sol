//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.0;

import "@openzeppelin/upgrades-core/contracts/Initializable.sol";

contract Box is Initializable {
    uint256 private value;

    event ValueChanged(uint256 newValue);

    // Cannot have constructors in upgradeable contracts so we set an initializer function instead
    function initialize(uint256 initialValue) public initializer {
        value = initialValue;
    }

    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    function retrieve() public view returns (uint256) {
        return value;
    }

    function version() public virtual pure returns (string memory) {
        return "1.0.0";
    }
}


contract BoxV2 is Box {
    function increment() public {
        store(retrieve() + 1);
    }

    function version() public virtual override pure returns (string memory) {
        return "2.0.0";
    }
}

contract BoxV3 is BoxV2 {
    function decrement() public {
        store(retrieve() - 1);
    }

    function version() public virtual override pure returns (string memory) {
        return "3.0.0";
    }
}