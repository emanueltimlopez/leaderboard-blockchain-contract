// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

struct Score {
  uint256 points;
  address addr;
  uint256 timestamp;
}

contract Leaderboard {

    Score[] private scores;
    uint256 private seed;

    event NewScore(uint256 points, address indexed from, uint256 timestamp);

    constructor () payable {}

    function saveScore(uint256 _points) public {
      scores.push(Score(_points, msg.sender, block.timestamp));
      emit NewScore(_points, msg.sender, block.timestamp);

      uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
      seed = randomNumber;

      if (randomNumber < 50) {
        uint256 prizeAmount = 0.0010 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
      }
    }

    function getLeaderboard() public view returns (Score[] memory) {
      return scores;
    }
}