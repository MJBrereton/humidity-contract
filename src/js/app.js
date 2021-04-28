
const Web3 = require('web3');
const contractBuild = require('../../build/contracts/SmartContract.json');
const net = require("net");

let web3 = new Web3(/*Web3.givenProvider || */"ws://localhost:7545");
let myContract = new web3.eth.Contract(contractBuild.abi, contractBuild.networks[5777].address);
let humidity = 0;
let doorOpen = false;
let acceleration = 0;

const deviceAccount = '0xe6160B16015B4C061C25b299dd2b5DCEae9D6cAF'

console.log('running');

myContract.methods.resetContract().send({from:deviceAccount})
.then(console.log);

let dataString = '';
let buffer = '';
const server = net.createServer(socket => {
  socket.write("Hello.")
  socket.on("data", data => {
    
    dataString = dataString.concat(data.toString());
    console.log(data.toString());
    while (dataString.includes('~')) {
      let split = dataString.split('~', 1);
      dataString = split[0];
      buffer = split[1];
      if (buffer == undefined) {
        buffer = '';
      }
      console.log('processed data: ', dataString);
      humidity = parseInt(dataString.substring(0,2));
      doorOpen = parseInt(dataString.substring(2,3));
      acceleration = parseFloat(dataString.substring(3,7));
      
      console.log('humidity: ', humidity);
      console.log('door: ', doorOpen);
      console.log('accel: ', acceleration);

      if (humidity > 80) {
        myContract.methods.humidityViolation(humidity).send({from:deviceAccount});
      }
  
      if (doorOpen == true) {
        myContract.methods.doorViolation(doorOpen).send({from:deviceAccount});
      }

      if (acceleration > 2.5) {
        // smart contract cannot store floats, so multiply by 100
        myContract.methods.shockViolation(acceleration * 100).send({from:deviceAccount});
      }

      dataString = buffer;
    }


    // socket echos data back to arduino
    socket.write(data.toString());

  })
});

// on my PC port 12100 is only enabled for private networks
// will need to change firewall rule for demonstrating at uni
server.listen(12100);