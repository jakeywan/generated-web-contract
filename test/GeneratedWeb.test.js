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

  it('Should print tokenURI', async () => {
    console.log(await contract.tokenURI(0))
    expect(true).to.equal(true)
  })

  // it('Should mint four specific tokens', async () => {
  //   const price = await contract.getCurrentPrice()
  //   await contract.mintSpecific(4, {
  //     gasLimit: 5000000,
  //     value: price
  //   })
  //   console.log("minted 4")

  //   const price2 = await contract.getCurrentPrice()
  //   await contract.mintSpecific(32, {
  //     gasLimit: 5000000,
  //     value: price2
  //   })
  //   console.log("minted 32")

  //   const price3 = await contract.getCurrentPrice()
  //   await contract.mintSpecific(999, {
  //     gasLimit: 5000000,
  //     value: price3
  //   })
  //   console.log("minted 999")

  //   const price4 = await contract.getCurrentPrice()
  //   await contract.mintSpecific(547, {
  //     gasLimit: 5000000,
  //     value: price4
  //   })
  //   console.log("minted 547")

  //   expect(true).to.equal(true)
  // })

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

  it('Should still mint random after many specific mints', async () => {
    for (let i = 0; i < 400; i++) {
      const price = await contract.getCurrentPrice()
      await contract.mintSpecific(i, {
        gasLimit: 5000000,
        value: price
      })
    }
  })

  it('Should let me mint here', async() => {
    const price = await contract.getCurrentPrice()
      await contract.mintRandom({
        gasLimit: 5000000,
        value: price
      })
  })

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

  // it('Should not mint any more tokens', async () => {
  //   const price = await contract.getCurrentPrice()
  //   const mint = contract.mintRandom({
  //       gasLimit: 5000000,
  //       value: price
  //     })
  //   expect(mint).to.be.revertedWith("no more ids")
  // })

  // it('Should report owners', async () => {
  //   for (let i = 0; i <= 999; i++) {
  //     console.log("owner of", i)
  //     console.log(await contract.ownerOf(i))
  //   }
    
  //   expect(true).to.equal(true)
  // })

  // it('Should not have data for token 1000', async () => {
  //   const owner = contract.tokenURI(1000)
  //   expect(owner).to.be.revertedWith("Token does not exist")
  // })

})
