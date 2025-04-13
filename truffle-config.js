const HDWalletProvider = require('@truffle/hdwallet-provider');

const ALCHEMY_SEPOLIA_RPC = `https://eth-sepolia.g.alchemy.com/v2/******************************`;
const PRIVATE_KEY = ''; // Or use dotenv: process.env.PRIVATE_KEY


module.exports = {

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [PRIVATE_KEY],
          providerOrUrl: ALCHEMY_SEPOLIA_RPC,
        }),
      network_id: 11155111,     // Sepolia's network ID
      gas: 5500000,             // Gas limit - optional
      confirmations: 2,         // # of confs to wait between deployments
      timeoutBlocks: 200,       // # of blocks before timeout
      skipDryRun: true,         // Skip dry run before migrations
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
      }
    }
  },
};
