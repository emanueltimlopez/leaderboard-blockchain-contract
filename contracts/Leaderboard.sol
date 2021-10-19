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

    event NewScore(uint256 points, address indexed from, uint256 timestamp);

    constructor() {}

    function saveScore(uint256 _points) public {
      scores.push(Score(_points, msg.sender, block.timestamp));
      emit NewScore(_points, msg.sender, block.timestamp);
    }

    function getLeaderboard() public view returns (Score[] memory) {
      return scores;
    }
}