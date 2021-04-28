// SPDX-License-Identifier: unlicensed
pragma solidity >=0.5.0;

contract SmartContract {
    address private supplier;
    address private buyer;
    address private device;
    uint private humidity;
    bool private doorState;
    uint private acceleration;
    bool private violated = false;

    constructor() public {
        device = msg.sender;
    }

    function humidityViolation(uint _humidity) public {
        require(device == msg.sender);
        humidity = _humidity;
        violated = true;
    }

    function doorViolation(bool _doorState) public {
        require(device == msg.sender);
        doorState = _doorState;
        violated = true;
    }

    function shockViolation(uint _acceleration) public {
        require(device == msg.sender);
        acceleration = _acceleration;
        violated = true;
    }

    function getHumidity() public view returns (uint) {
        return humidity;
    }

    function getDoorState() public view returns (bool) {
        return doorState;
    }

    function getAcceleration() public view returns (uint) {
        return acceleration;
    }

    function getViolated() public view returns (bool) {
        return violated;
    }

    // TEST FUNCTIONS
    function resetContract() public {
        humidity = 0;
        doorState = false;
        acceleration = 0;
        violated = false;
    }

}

