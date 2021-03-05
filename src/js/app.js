const Web3 = require('web3');
const artifact = require('../../build/contracts/HumidityContract.json');
var contract = require("@truffle/contract");
var artifactor = require("@truffle/artifactor");

// const TruffleContract = require('@truffle/contract');

// var provider = new Web3(Web3.givenProvider || "ws://localhost:7545");
// var contract = require("@truffle/contract");

// creates a web3 provider variable
let web3 = new Web3(/*Web3.givenProvider || */"ws://localhost:7545");

// THIS ACTUALLY WORKS, IF ADDRESS IS UPDATED
let myContract = new web3.eth.Contract(artifact.abi, '0xfF838E24749EE85188c4D4c6b4285C52A416454C');
myContract.methods.getHumidity().call()
.then(console.log);

myContract.methods.humidityViolation(128).send({from:'0x23d4e75F0B427a97f9C3EA818033c4E5dbeC6A6e'})
.then(console.log);


// myContract.methods.myMethod([param1[, param2[, ...]]]).send(options[, callback])

// Set up access for a deployed smart contract
// this is a get json request. the first param is the address to request, the function param is optional
// and dictates a function to run if the request is successful
// $.getJSON('HumidityContract.json', function(data) {
//   // Get the necessary contract artifact file and instantiate it with @truffle/contract
//   humidiyContract = TruffleContract(data);
//   // sets the provider of the contract
//   humidiyContract.setProvider(web3)
// });

var humidiyContract = contract(artifact);

try {
  humidiyContract.setProvider(web3);
} catch (e) {
  console.error(e);
  // expected output: "Parameter is not a number!"
};

// Put a call function here
var humidityContractInstance;


humidiyContract.deployed().then(function(instance) {
  humidityContractInstance = instance;

  return humidityContractInstance.getHumidity.call();
}).then(function(humidity) {
  console.log(humidity);
}).catch(function(err) {
  console.log(err.message);
});


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