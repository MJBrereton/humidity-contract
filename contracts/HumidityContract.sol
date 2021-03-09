// SPDX-License-Identifier: unlicensed
pragma solidity >=0.4.22 <0.8.0;

contract HumidityContract {
    address private supplier;
    address private buyer;
    address private device;
    uint private humidity;
    bool private violated = false;

    constructor() public {
        device = msg.sender;
    }

    function humidityViolation(uint _humidity) public {
        require(device == msg.sender);
        humidity = _humidity;
        // change this
        device = msg.sender;
        violated = true;
    }

    function getHumidity() public view returns (uint) {
        return humidity;
    }

    function getViolated() public view returns (bool) {
        return violated;
    }

    // TEST FUNCTIONS
    function resetContract() public {
        humidity = 0;
        violated = false;
    }



}

