// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    uint256 totalSummer;
    uint256 totalWinter;
    address owner;

    mapping(address => bool) whitelistedAddresses;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
    require(msg.sender == owner, "Ownable: caller is not the owner");
    _;
    }

    modifier isWhitelisted(address _address) {
        require(whitelistedAddresses[_address], "You need to be whitelisted");
        _;
    }

    function addUser(address _addressToWhitelist) public onlyOwner {
        whitelistedAddresses[_addressToWhitelist] = true;
    }

    function wave(string memory _message) public isWhitelisted(msg.sender) {
        totalWaves += 1;
        string memory winter = "winter";
        string memory summer = "summer";
        if (keccak256(abi.encodePacked(_message)) == keccak256(abi.encodePacked(winter))){
            totalWinter += 1;
        } else if (keccak256(abi.encodePacked(_message)) == keccak256(abi.encodePacked(summer))){
            totalSummer += 1;
        }
        console.log("%s waved w/ message %s", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);
        whitelistedAddresses[msg.sender] = false;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotal() public view returns (uint256, uint256, uint256) {
        console.log("We have %d total waves!", totalWaves);
        return (totalWaves, totalSummer, totalWinter);

    }

}