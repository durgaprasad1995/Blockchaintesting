pragma solidity ^0.4.17;

contract FundRaise {
    address public owner;
    bool paused;

    // modifiers
    modifier onlyOwner() {
        assert(owner == msg.sender);
        _;
    }

    modifier whenNotPaused(){
        require(!paused);
        _;
    }

    // @dev constructor function. Sets contract owner
    function FundRaised() public{
        owner = msg.sender;
    }

    // fallback function to accept ETH into contract.
    function () whenNotPaused public payable {
    }
    function removeFunds() public {
        owner.transfer(address(this).balance);
    }
}


