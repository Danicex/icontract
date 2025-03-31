// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProjectAccessControl {
    address public owner;
    uint256 public accessFee = 0.01 ether; // Fee to use the app

    mapping(address => bool) public hasPaid; // Tracks users who paid
    mapping(uint256 => address) public projectOwners; // Maps project ID to owner
    mapping(uint256 => mapping(address => bool)) public projectAccess; // Maps project ID to users with view access

    event AccessGranted(address indexed user);
    event ProjectShared(uint256 indexed projectId, address indexed sharedWith);
    event ProjectUnshared(uint256 indexed projectId, address indexed sharedWith);

    constructor() {
        owner = msg.sender; // Contract deployer is the owner
    }

    // Users pay to access the app
    function payForAccess() external payable {
        require(msg.value == accessFee, "Incorrect fee");
        hasPaid[msg.sender] = true;
        emit AccessGranted(msg.sender);
    }

    // Owner can update the access fee
    function updateAccessFee(uint256 newFee) external {
        require(msg.sender == owner, "Only owner can update fee");
        accessFee = newFee;
    }

    // Store a new project
    function registerProject(uint256 projectId) external {
        require(hasPaid[msg.sender], "Must pay for access first");
        require(projectOwners[projectId] == address(0), "Project already exists");
        projectOwners[projectId] = msg.sender;
    }

    // Grant view access to another user
    function shareProject(uint256 projectId, address user) external {
        require(msg.sender == projectOwners[projectId], "Not the project owner");
        projectAccess[projectId][user] = true;
        emit ProjectShared(projectId, user);
    }

    // Revoke view access
    function unshareProject(uint256 projectId, address user) external {
        require(msg.sender == projectOwners[projectId], "Not the project owner");
        projectAccess[projectId][user] = false;
        emit ProjectUnshared(projectId, user);
    }

    // Check if a user has access to a project
    function hasAccess(uint256 projectId, address user) external view returns (bool) {
        return projectAccess[projectId][user];
    }

    // Withdraw funds (only owner)
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
