const Papa = require('papaparse')
const fs = require('fs')

// FILE TO READ
const fingerprintsList = fs.createReadStream('./allowlistSources/fingerprints.csv')
const coinsList = fs.createReadStream('./allowlistSources/coin-2.csv')
const ornamentLeegte = fs.createReadStream('./allowlistSources/ornamentLeegte.csv')
const dudes = fs.createReadStream('./allowlistSources/theDudesSnapshot.csv')
const jotform = fs.createReadStream('./allowlistSources/jotform_allowlist_data.csv')
const janABOwners = fs.createReadStream('./allowlistSources/janABOwners.csv')
const citadel = require('../allowlistSources/citadel.js')

const buildLists = () => {

  const holders = []
  const fingerprints = []
  const community = []



  // FINGERPRINTS LIST
  const onComplete = (results, file) => {
    // PARSE THE CSV
    results.data.forEach((item, index) => {
      if (item.TOKEN_NAME === "Fingerprints" || item.TOKEN_NAME === "Voxelglyph") {
        fingerprints.push(item.USER_ADDRESS)
      } else {
        community.push(item.USER_ADDRESS)
      }
    })
  }

  Papa.parse(fingerprintsList, {
    header: true,
    complete: onComplete
  })



  // COIN LIST
  const coinComplete = (results, file) => {
    // PARSE THE CSV
    results.data.forEach((item, index) => {
        community.push(item.owner)
    })
  }

  Papa.parse(coinsList, {
    header: true,
    complete: coinComplete
  })


  // ORNAMENT LEEGTE LIST
  const ornamentComplete = (results, file) => {
    // PARSE THE CSV
    results.data.forEach((item, index) => {
        holders.push(item.USER_ADDRESS)
    })
  }

  Papa.parse(ornamentLeegte, {
    header: true,
    complete: ornamentComplete
  })


  // DUDES
  const dudesComplete = (results, file) => {
    // PARSE THE CSV
    results.data.forEach((item, index) => {
        community.push(item.address)
    })
  }

  Papa.parse(dudes, {
    header: true,
    complete: dudesComplete
  })

    // JOTFORM
    const jotformComplete = (results, file) => {
        // PARSE THE CSV
        results.data.forEach((item, index) => {
            community.push(item['Ethereum Wallet Address'])
        })
    }

    Papa.parse(jotform, {
        header: true,
        complete: jotformComplete
    })


    // janABOwners
    const janOnComplete = (results, file) => {
        // PARSE THE CSV
        results.data.forEach((item, index) => {
            holders.push(item.owner)
        })
    }

  Papa.parse(janABOwners, {
      header: true,
      complete: janOnComplete
  })

  citadel.forEach(item => {
    holders.push(item)
  })

  setTimeout(() => {
    // write metadata file
    fs.writeFile(`./allowlists/holders.js`, 'module.exports = ' + JSON.stringify(holders, null, 2), () => {
        console.log('written')
    })
    fs.writeFile(`./allowlists/fingerprints.js`, 'module.exports = ' + JSON.stringify(fingerprints, null, 2), () => {
        console.log('written')
        })
    fs.writeFile(`./allowlists/communities.js`, 'module.exports = ' + JSON.stringify(community, null, 2), () => {
        console.log('written')
    })
  }, 4000)
  
  
}

buildLists()