const Web3 = require('web3');
const contractBuild = require('../../build/contracts/HumidityContract.json');
// npm package usage says to use var idk why
const contract = require("@truffle/contract");
const artifactor = require("@truffle/artifactor");

const net = require("net");

let web3 = new Web3(/*Web3.givenProvider || */"ws://localhost:7545");
let myContract = new web3.eth.Contract(contractBuild.abi, contractBuild.networks[5777].address);
let humidity = 0;

myContract.methods.resetContract().send({from:'0xa9354D87BA1c8F0b49Bde922831fe8C587176A88'})
.then(console.log);

const server = net.createServer(socket => {
  socket.write("Hello.")
  socket.on("data", async data => {

    socket.write(data.toString());
    humidity = parseInt(data.toString());
    console.log(data.toString());

    // TODO: only execute if getViolated() returns false
    // i.e. only call the humidity violation function once
    if (humidity > 80) { 
      myContract.methods.humidityViolation(humidity).send({from:'0xa9354D87BA1c8F0b49Bde922831fe8C587176A88'})
      .then(console.log);
    }
  })
});

// on my PC port 8080 is only enabled for private networks
// will need to change firewall rule for uni
server.listen(8080);

function resolveViolation() {
  console.log(myContract.methods.getViolated().call());
  if (!myContract.methods.getViolated().call()) {
    
    console.log('VIOLATION');
    
    // send to contract. requires address of sender
    myContract.methods.humidityViolation(humidity).send({from:'0x36C8769FFfe0152a3806977A98923c351674e1D5'})
    .then(console.log);
  }

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