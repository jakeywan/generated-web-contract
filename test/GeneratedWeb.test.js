const { expect } = require('chai')
const { utils } = require('ethers')
const { ethers } = require('hardhat')
const { time } = require('@nomicfoundation/hardhat-network-helpers')

// const metadata = require('../files/final_data.json')

describe('GeneratedWeb', () => {

  let contract

  before(async () => {
    const [deployer] = await ethers.getSigners()
    deployerAddress = deployer.address

    const GeneratedWeb = await ethers.getContractFactory('GeneratedWeb')
    contract = await GeneratedWeb.deploy()

  })

  it('Should get price', async () => {
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    expect(true).to.equal(true)
  })

  it('Should print tokenURI', async () => {
    console.log(await contract.tokenURI(1))
    expect(true).to.equal(true)
  })

})
