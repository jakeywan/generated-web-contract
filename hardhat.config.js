/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-waffle')
require("hardhat-gas-reporter");

module.exports = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 10_000,
      },
    },
  },
  defaultNetwork: "localhost",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
    hardhat: {
      forking: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      }
    },
    base: {
      url: `https://mainnet.base.org`,
      chainId: 8453,
      accounts: [process.env.WALLET_PRIVATE_KEY],
      browserURL: "https://basescan.org"
    }
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_KEY,
      goerli: process.env.ETHERSCAN_KEY,
      sepolia: process.env.ETHERSCAN_KEY,
      base: 'NT1MMJCR5ID4NHM3WGZ1AXZVQPI3CSYFH3'
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ],
  },
  mocha: {
    timeout: 80000
  }
}
