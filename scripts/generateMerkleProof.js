const data = require('../files/merkle.json')
const addresses = require('../files/studioCertPublicAddresses.js')
const keccak256 = require('keccak256')
const { MerkleTree } = require('merkletreejs')

const generateMerkleProof = (address) => {
  let leafNodes = []
  addresses.forEach((addy, index) => {
    leafNodes.push(keccak256(addy.address))
  })

  const merkleTree = new MerkleTree(
    leafNodes,
    keccak256,
    { sortPairs: true }
  )

  return merkleTree.getHexProof(keccak256(address))
}

module.exports = generateMerkleProof