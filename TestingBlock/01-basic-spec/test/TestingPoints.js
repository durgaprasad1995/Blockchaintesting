const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode } = require('../test/CompilePoints');

let accounts;
let Rating;
let address;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    console.log("Accounts",accounts);
    
    Rating = await new web3.eth.Contract(JSON.parse(interface,address))
        .deploy({data: bytecode, arguments: []})
        .send({from: accounts[1], gas: '1000000'});
        // console.log("My Token",MyToken)
        // MyPoint.setProvider(provider);
    console.log("List of Adress",Rating.options.address)
});

describe('Rating', () => {
    it('deploys a contract', () => {
        assert.ok(Rating.options.address);
    });

    it('Reading Balance', async () => {
        // const addPoints = await Rating.methods.addPoints(accounts[9]).call();

        let Balance = await web3.eth.getBalance(accounts[1])
        // assert.equal(balance, 0);
        console.log('asserting Balance',Balance)
    });
    it('owner is correct', async () => {
        const result = await Rating.methods.owner().call();
        assert.equal(result, accounts[1]);
        console.log('Result of owner',result)
    });
    it('Adding Points', async () => {
       const Add =  await Rating.methods.addPoints(accounts[1]);
        // assert.equal(add, 64);
        console.log('square Number',Add)
    
    });
    // it('can square the number', async () => {
    //     const squaredNum = await calc.methods.sqNum(8).call();
    //     assert.equal(squaredNum, 64);
    //     console.log('square Number',squaredNum)
    // });
});