const path = require('path');
const fs = require('fs');
const solc = require('solc');

const Solidity = path.resolve(__dirname, 'Points.sol');
const source = fs.readFileSync(Solidity, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Rating'];