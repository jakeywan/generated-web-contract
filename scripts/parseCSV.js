const Papa = require('papaparse')
const fs = require('fs')
// const holderAddresses = require('../files/finalCertPlusHolderList.js')

// FILE TO READ
const file = fs.createReadStream('./files/Addresses for Phase 1 - Sheet1.csv')

const parseCSV = () => {

  const addresses = []

  const onComplete = (results, file) => {
    // PARSE THE CSV
    results.data.forEach((item, index) => {
      console.log(item)
      console.log(item.Address)
      addresses.push(item.Address)
    })

    // INSERT THE ADDRESSES FROM THE CERT PLUS HOLDER LIST
    // addresses.push(...holderAddresses)

    // write metadata file
    fs.writeFile(`./files/Addresses for Phase 1 - Sheet1.json`, JSON.stringify(addresses, null, 2), () => {
      console.log('written')
    })
  }

  Papa.parse(file, {
    header: true,
    complete: onComplete
  })
  
}

parseCSV()