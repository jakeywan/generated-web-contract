const tokenData = require("./web_traits.js")
const fs = require('fs')

const buildMetadata = () => {
    const ids = Object.keys(tokenData)

    let finalData = []

    ids.forEach(id => {
        const data = tokenData[id]

        const hueValue = data.colorValue * 360
        let color
        if (hueValue >= 345 && hueValue <= 14) {
            color = '#FF0000'
        } else if (hueValue >= 15 && hueValue <= 44) {
            color = '#FF8000'
        } else if (hueValue >= 45 && hueValue <=74) {
            color = '#FFFF00'
        } else if (hueValue >= 75 && hueValue <= 104) {
            color = '#80FF00'
        } else if (hueValue >= 105 && hueValue <= 134) {
            color = '#00FF00'
        } else if (hueValue >= 135 && hueValue <= 164) {
            color = '#00FF80'
        } else if (hueValue >= 165 && hueValue <= 194) {
            color = '#00FFFF'
        } else if (hueValue >= 195 && hueValue <= 224) {
            color = '#0080FF'
        } else if (hueValue >= 225 && hueValue <= 254) {
            color = '#0000FF'
        } else if (hueValue >= 255 && hueValue <= 284) {
            color = '#8000FF'
        } else if (hueValue >= 285 && hueValue <= 314) {
            color = '#FF00FF'
        } else if (hueValue >= 315 && hueValue <= 344) {
            color = '#FF0080'
        }
        let complexity
        if (data.complexity < .33) {
            complexity = 'simple'
        } else if (data.complexity >= .33 && data.complexity < .66) {
            complexity = 'medium'
        } else if (data.complexity >=.66) {
            complexity = 'intricate'
        }

        let coverage
        if (data.coverage < .33) {
            coverage = 'thin'
        } else if (data.coverage >= .33 && data.coverage < .66) {
            coverage = 'medium'
        } else if (data.coverage >=.66) {
            coverage = 'full'
        }

        let metadata = {
            id: data.id,
            name: data.name,
            color: color,
            coverage: coverage,
            complexity: complexity
        }
    
        finalData.push(metadata)

    })

    // write metadata file
    fs.writeFile(`./files/metadata.json`, JSON.stringify(finalData, null, 2), () => {
        console.log('written')
      })
}

buildMetadata()