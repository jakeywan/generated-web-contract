const { expect } = require('chai')
const { utils } = require('ethers')
const { ethers } = require('hardhat')
const { time } = require('@nomicfoundation/hardhat-network-helpers')
const generateMerkleProof = require('../scripts/generateMerkleProof')
const holders = require('../allowlists/holders')
const provider = waffle.provider;
const metadata = require('../files/metadata')

// const metadata = require('../files/final_data.json')

describe('GeneratedWeb', () => {

  let contract
  let holderProof

  before(async () => {
    const [deployer] = await ethers.getSigners()
    deployerAddress = deployer.address

    const GeneratedWeb = await ethers.getContractFactory('GeneratedWeb')
    contract = await GeneratedWeb.deploy()

    holderAddress = '0xaBCF7ca8Ba78eB75d79DFf6B0F9fa23e78293cCB'
    holderProof = generateMerkleProof(holderAddress, holders)
    console.log('Holder merkle proof:', holderProof)

    holderSigner =  new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider)
    // first fund our wallet (doesn't have eth on test network)
    await deployer.sendTransaction({
      to: holderAddress,
      value: ethers.utils.parseEther("6.0"), // Sends exactly 6.0 ether
    });

  })

  it('Should add tokendata', async() => {
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
  })

  it('Should get price', async () => {
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    console.log(await contract.getCurrentPrice())
    await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    // await time.increase(300); // 5 minutes
    // console.log(await contract.getCurrentPrice())
    expect(true).to.equal(true)
  })

  it('Should mint four specific tokens', async () => {
    const price = await contract.getCurrentPrice()
    await contract.mintSpecific(4, [], ethers.constants.AddressZero, {
      gasLimit: 5000000,
      value: price
    })
    console.log("minted 4")
    console.log(await contract.tokenURI(4))

    const price2 = await contract.getCurrentPrice()
    await contract.mintSpecific(32, [], ethers.constants.AddressZero, {
      gasLimit: 5000000,
      value: price2
    })
    console.log("minted 32")

    const price3 = await contract.getCurrentPrice()
    await contract.mintSpecific(999, [], ethers.constants.AddressZero, {
      gasLimit: 5000000,
      value: price3
    })
    console.log("minted 999")
    console.log(await contract.tokenURI(999))

    const price4 = await contract.getCurrentPrice()
    await contract.mintSpecific(547, [], ethers.constants.AddressZero, {
      gasLimit: 5000000,
      value: price4
    })
    console.log("minted 547")

    expect(true).to.equal(true)
  })

  // it('Should mint 996 random tokens', async () => {
  //   for (let i = 1; i <= 996; i++) {
  //     const price = await contract.getCurrentPrice()
  //     await contract.mintRandom({
  //       gasLimit: 5000000,
  //       value: price
  //     })
  //     console.log(i)
  //   }
  //   expect(true).to.equal(true)
  // }) 

  // it('Should still mint random after many specific mints', async () => {
  //   for (let i = 0; i < 200; i++) {
  //     const price = await contract.getCurrentPrice()
  //     await contract.mintSpecific(i, {
  //       gasLimit: 5000000,
  //       value: price
  //     })
  //   }
  // })

  // it('Should let me mint here', async() => {
  //   const price = await contract.getCurrentPrice()
  //     await contract.mintRandom({
  //       gasLimit: 5000000,
  //       value: price
  //     })
  // })

  // it('Should mint 1000 random tokens', async () => {
  //   for (let i = 0; i <= 999; i++) {
  //     const price = await contract.getCurrentPrice()
  //     await contract.mintRandom({
  //       gasLimit: 5000000,
  //       value: price
  //     })
  //     console.log(i)
  //   }
  //   expect(true).to.equal(true)
  // })

  it('Should let a holder mint with a 20% discount', async () => {
    const currentPrice = await contract.getCurrentPrice()

    const mintTxn = await contract.connect(holderSigner).mintSpecific(12, holderProof, ethers.constants.AddressZero, {
      gasLimit: 5000000,
      value: String(Number(currentPrice) * 0.8)
    })
    const owner = await contract.ownerOf(12)
    expect(owner).to.equal('0xaBCF7ca8Ba78eB75d79DFf6B0F9fa23e78293cCB')
  })

  it('Should NOT let a non-holder mint with a 20% discount', async () => {
    const currentPrice = await contract.getCurrentPrice()

    const mintTxn = contract.mintSpecific(13, holderProof, ethers.constants.AddressZero, {
      gasLimit: 5000000,
      value: String(Number(currentPrice) * 0.8)
    })
    
    expect(mintTxn).to.be.revertedWith("Not enough ether")
  })

  it('Should not mint any more tokens', async () => {
    const price = await contract.getCurrentPrice()
    const mint = contract.mintRandom({
        gasLimit: 5000000,
        value: price
      })
    expect(mint).to.be.revertedWith("no more ids")
  })

  // it('Should report owners', async () => {
  //   for (let i = 0; i <= 999; i++) {
  //     console.log("owner of", i)
  //     console.log(await contract.ownerOf(i))
  //   }
    
  //   expect(true).to.equal(true)
  // })

  it('Should not have data for token 1000', async () => {
    const owner = contract.tokenURI(1000)
    expect(owner).to.be.revertedWith("Token does not exist")
  })

  // TODO: test withdrawing funds
  it('Should withdraw funds', async () => {
    const contractBalance = await ethers.provider.getBalance(contract.address)
    const contractEtherBalance = ethers.utils.formatEther(contractBalance)

    const testAddress = '0x2D63a6Ee734287955Edc1201ef3344E5Fe7E2847'
    const balance = await ethers.provider.getBalance(testAddress)
    const etherBalance = ethers.utils.formatEther(balance)

    // overloaded functions for `release` and `released`
    const releaseTxn = await contract.withdraw()
    await releaseTxn.wait()
    
    const newUserEtherBalance = ethers.utils.formatEther(await ethers.provider.getBalance(testAddress))

    // rounding to avoid small precision inaccuracies reporting failed tests
    expect(parseFloat(newUserEtherBalance * 1).toFixed(8)).to.equal(parseFloat(etherBalance * 1 + contractEtherBalance * 1).toFixed(8))
  })

  

  // TODO: test delegate.cash functionality 

})
