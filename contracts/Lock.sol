// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    enum EggStatus { Created, Packed, Shipped, Delivered }

    struct Egg {
        uint id;
        uint[] dates;
       
    }

    uint public eggId;
    mapping(uint => Egg) public eggs;

    event EggCreated(uint id, uint date);
    event EggStatusChanged(uint id, EggStatus status, uint date);

    function createEgg() public {
        eggId++;
        eggs[eggId].id = eggId;
        eggs[eggId].dates.push(block.timestamp);

        emit EggCreated(eggId, block.timestamp);
    }

    function packEgg(uint _eggId) public {
        require(eggs[_eggId].dates.length == 1, "Egg not in Created state");
        updateStatus(_eggId, EggStatus.Packed);
    }

    function shipEgg(uint _eggId) public {
        require(eggs[_eggId].dates.length == 2, "Egg not in Packed state");
        updateStatus(_eggId, EggStatus.Shipped);
    }

    function deliverEgg(uint _eggId) public {
        require(eggs[_eggId].dates.length == 3, "Egg not in Shipped state");
        updateStatus(_eggId, EggStatus.Delivered);
    }

    function updateStatus(uint _eggId, EggStatus _status) internal {
        eggs[_eggId].dates.push(block.timestamp);
        emit EggStatusChanged(_eggId, _status, block.timestamp);
    }

    

    function getIdAndDates(uint _eggId) public view returns (uint, uint[] memory) {
        return (eggs[_eggId].id, eggs[_eggId].dates);
    }

    function getCreatedDate(uint _eggId) public view returns (uint) {
        return eggs[_eggId].dates[0];
    }

    function getPackedDate(uint _eggId) public view returns (uint) {
        return eggs[_eggId].dates[1];
    }

    function getShippedDate(uint _eggId) public view returns (uint) {
        return eggs[_eggId].dates[2];
    }

    function getDeliveredDate(uint _eggId) public view returns (uint) {
        return eggs[_eggId].dates[3];
    }
}