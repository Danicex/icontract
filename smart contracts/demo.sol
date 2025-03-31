// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyContract {
    // State variable
    address public owner;
    uint256 public value;

    // Event
    event ValueUpdated(address indexed updater, uint256 newValue);

    // Modifier to restrict access
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Constructor (runs once when deployed)
    constructor() {
        owner = msg.sender;
    }

    // Function to update value
    function updateValue(uint256 _newValue) public onlyOwner {
        value = _newValue;
        emit ValueUpdated(msg.sender, _newValue);
    }

    // Function to retrieve the contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to receive ETH
    receive() external payable {}
}