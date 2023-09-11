const keccak256 = require('keccak256')
const { MerkleTree } = require('merkletreejs')

const generateMerkleProof = (address, sourceSet) => {
  let leafNodes = []
  sourceSet.forEach((addy, index) => {
    leafNodes.push(keccak256(addy))
  })

  const merkleTree = new MerkleTree(
    leafNodes,
    keccak256,
    { sortPairs: true }
  )

  return merkleTree.getHexProof(keccak256(address))
}

module.exports = generateMerkleProof