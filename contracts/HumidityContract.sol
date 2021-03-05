// SPDX-License-Identifier: unlicensed
pragma solidity >=0.4.22 <0.8.0;

contract HumidityContract {
    address public supplier;
    uint private humidity = 5;

    function humidityViolation(uint _humidity) public {
        humidity = _humidity;
        supplier = msg.sender;
    }

    function getHumidity() public view returns (uint) {
        return humidity;
    }

}

