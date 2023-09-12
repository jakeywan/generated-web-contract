const { utils } = require('ethers')
const metadata = require('../files/metadata')

async function main() {

  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)

  // Deploy
  const Contract = await ethers.getContractFactory('GeneratedWeb')
  const contract = await Contract.deploy()
  console.log('Contract deployed to: ', contract.address)

  await contract.addTokenData(metadata.slice(0, 100)) // IMPORTANT, slice exludes the last value
  await contract.addTokenData(metadata.slice(100, 200))
  await contract.addTokenData(metadata.slice(200, 300))
  await contract.addTokenData(metadata.slice(300, 400))
  await contract.addTokenData(metadata.slice(400, 500))
  await contract.addTokenData(metadata.slice(500, 600))
  await contract.addTokenData(metadata.slice(600, 700))
  await contract.addTokenData(metadata.slice(700, 800))
  await contract.addTokenData(metadata.slice(800, 900))
  await contract.addTokenData(metadata.slice(900, 1000))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });