pragma solidity ^0.4.0;

contract Rating {
    address public owner;
     
    constructor() public { owner = msg.sender; }
   
    modifier onlyOwner {
        require( msg.sender == owner,"Only owner can call this function.");
        _;
    }
    
     function addPoints(address _addrs) payable  public onlyOwner{
        require(msg.value > 0);
        _addrs.transfer(msg.value);
    }
    
    function redeemPoints() payable public {
        require(msg.value > 0);
        owner.transfer(msg.value);
      }
    
    function redeemAll() payable public {
        require(msg.sender.balance > 0);
        owner.transfer(msg.sender.balance);
    }
}