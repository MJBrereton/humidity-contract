
const Web3 = require('web3');
const contractBuild = require('../../build/contracts/SmartContract.json');
// npm package usage says to use var idk why
const contract = require("@truffle/contract");
const artifactor = require("@truffle/artifactor");
const net = require("net");

let web3 = new Web3(/*Web3.givenProvider || */"ws://localhost:7545");
let myContract = new web3.eth.Contract(contractBuild.abi, contractBuild.networks[5777].address);
let humidity = 0;
let doorOpen = false;
let acceleration = 0;

const deviceAccount = '0x1f63897bA94a7B2A4b54224977D0E0D033bbba1A'

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



// on my PC port 8080 is only enabled for private networks
// will need to change firewall rule for uni
server.listen(12100);

function resolveViolation() {
  console.log(myContract.methods.getViolated().call());
  if (!myContract.methods.getViolated().call()) {
    
    console.log('VIOLATION');
    
    // send to contract. requires address of sender
    myContract.methods.humidityViolation(humidity).send({from:deviceAccount})
    .then(console.log);
  }

}

function myfunction() {   
  document.write("testing intervals");  
  var intervalId = window.setInterval(function(){
    console.log('interval')
  }, 5000);
}


// creates a web3 provider object
// can see methods on web3
// let web3 = new Web3.default(/*Web3.givenProvider || */"ws://localhost:7545");
// can't see methods on web32 but they seem to work
// let web32 = new Web3("ws://localhost:7545");
// trying to create a contract object
// can't see methods on humidityContract (they also don't work yet but probs my fault)
// let humidityContract = contract(contractBuild);



// if (humidity > 65) {
//   // create a contract object with address of smart contract
  
//   // call contract
//   myContract.methods.getHumidity().call()
//   .then(console.log);
  
//   // send to contract. requires address of sender
//   myContract.methods.humidityViolation(humidity).send({from:'0x36C8769FFfe0152a3806977A98923c351674e1D5'})
//   .then(console.log);
// }



// Set up access for a deployed smart contract
// this is a get json request. the first param is the address to request, the function param is optional
// and dictates a function to run if the request is successful
// $.getJSON('HumidityContract.json', function(data) {
//   // Get the necessary contract artifact file and instantiate it with @truffle/contract
//   humidiyContract = TruffleContract(data);
//   // sets the provider of the contract
//   humidiyContract.setProvider(web3)
// });

// let humidiyContract = contract(contractBuild);


// try {
//   humidiyContract.setProvider(web3);
// } catch (e) {
//   console.error(e);
//   // expected output: "Parameter is not a number!"
// };

// // Put a call function here
// var humidityContractInstance;


// humidiyContract.deployed().then(function(instance) {
//   humidityContractInstance = instance;

//   return humidityContractInstance.getHumidity.call();
// }).then(function(humidity) {
//   console.log(humidity);
// }).catch(function(err) {
//   console.log(err.message);
// });


// put a send function here
// var humidityContractInstance;

// web3.eth.getAccounts(function(error, accounts) {
//   if (error) {
//     console.log(error);
//   }

//   var account = accounts[0];

//   App.contracts.Adoption.deployed().then(function(instance) {
//     humidityContractInstance = instance;

//     // Execute adopt as a transaction by sending account
//     return humidityContractInstance.adopt(petId, {from: account});
//   }).then(function(result) {
//     return App.markAdopted();
//   }).catch(function(err) {
//     console.log(err.message);
//   });
// });