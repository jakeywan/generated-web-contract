const addresses = require('../files/communities.js')
const keccak256 = require('keccak256')
const { MerkleTree } = require('merkletreejs')
const fs = require('fs')
const path = require('path')
const { utils } = require('ethers')

const exec = async () => {
  let leafNodes = []
  
  addresses.forEach((addy, index) => {
    leafNodes.push(keccak256(addy))
  })

  const merkleTree = new MerkleTree(
    leafNodes,
    keccak256,
    { sortPairs: true }
  )

  // Collect and log merkle root
  const merkleRoot = merkleTree.getHexRoot()
  console.log(`Generated Merkle root: ${merkleRoot}`)

  console.log('Tree', merkleTree.toString())

  // Output file path
  const outputPath = path.join(__dirname, "../files/merkle.json")

  // Collect and save merkle tree + root
  await fs.writeFileSync(
    // Output to merkle.json
    outputPath,
    // Root + full tree
    JSON.stringify({
      root: merkleRoot,
      tree: merkleTree
    })
  )
  console.log("Generated merkle tree and root saved to merkle.json.")
}

exec()