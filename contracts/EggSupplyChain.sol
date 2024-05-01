// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EggSupplyChain {
    struct Egg {
        uint256 productionDate;
        uint256 gradedDate;
        uint256 packagedDate;
        uint256 distributedDate;
    }

    mapping(uint256 => Egg) public eggs;
    uint256 public totalEggs;

    event EggProduced(uint256 eggId, uint256 productionDate);
    event EggGraded(uint256 eggId, uint256 gradedDate);
    event EggPackaged(uint256 eggId, uint256 packagedDate);
    event EggDistributed(uint256 eggId, uint256 distributedDate);

    function produceEgg() public {
        totalEggs++;
        eggs[totalEggs].productionDate = block.timestamp;
        emit EggProduced(totalEggs, block.timestamp);
    }

    function setGradedDate(uint256 eggId) public {
        require(eggId <= totalEggs, "Invalid egg ID");
        require(eggs[eggId].gradedDate == 0, "Egg already graded");
        require(eggs[eggId].productionDate != 0, "Egg not produced yet");
        eggs[eggId].gradedDate = block.timestamp;
        emit EggGraded(eggId, block.timestamp);
    }

    function setPackagedDate(uint256 eggId) public {
        require(eggId <= totalEggs, "Invalid egg ID");
        require(eggs[eggId].packagedDate == 0, "Egg already packaged");
        require(eggs[eggId].gradedDate != 0, "Egg not graded yet");
        eggs[eggId].packagedDate = block.timestamp;
        emit EggPackaged(eggId, block.timestamp);
    }

    function setDistributedDate(uint256 eggId) public {
        require(eggId <= totalEggs, "Invalid egg ID");
        require(eggs[eggId].distributedDate == 0, "Egg already distributed");
        require(eggs[eggId].packagedDate != 0, "Egg not packaged yet");
        eggs[eggId].distributedDate = block.timestamp;
        emit EggDistributed(eggId, block.timestamp);
    }

    function getEggDates(uint256 eggId) public view returns (uint256, uint256, uint256, uint256) {
        require(eggId <= totalEggs, "Invalid egg ID");
        Egg storage egg = eggs[eggId];
        return (egg.productionDate, egg.gradedDate, egg.packagedDate, egg.distributedDate);
    }
}
