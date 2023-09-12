const tokenData = require("./web_traits.js")
const fs = require('fs')

const buildMetadata = () => {
    const ids = Object.keys(tokenData)

    let finalData = []

    ids.forEach(id => {
        const data = tokenData[id]

        const hueValue = data.colorValue * 360
        let color
        if (hueValue >= 345 || hueValue < 15) {
            color = 0 //'#FF0000'
        } else if (hueValue >= 15 && hueValue < 45) {
            color = 1 //'#FF8000'
        } else if (hueValue >= 45 && hueValue <75) {
            color = 2 //'#FFFF00'
        } else if (hueValue >= 75 && hueValue < 105) {
            color = 3 //'#80FF00'
        } else if (hueValue >= 105 && hueValue < 135) {
            color = 4 //'#00FF00'
        } else if (hueValue >= 135 && hueValue < 165) {
            color = 5 //'#00FF80'
        } else if (hueValue >= 165 && hueValue < 195) {
            color = 6 //'#00FFFF'
        } else if (hueValue >= 195 && hueValue < 225) {
            color = 7 //'#0080FF'
        } else if (hueValue >= 225 && hueValue < 255) {
            color = 8 //'#0000FF'
        } else if (hueValue >= 255 && hueValue < 285) {
            color = 9 //'#8000FF'
        } else if (hueValue >= 285 && hueValue < 315) {
            color = 10 //'#FF00FF'
        } else if (hueValue >= 315 && hueValue < 345) {
            color = 11 //'#FF0080'
        }
        let complexity
        if (data.complexity < .33) {
            complexity = 0 //'simple'
        } else if (data.complexity >= .33 && data.complexity < .66) {
            complexity = 1 //'medium'
        } else if (data.complexity >=.66) {
            complexity = 2 //'intricate'
        }

        let coverage
        if (data.coverage < .33) {
            coverage = 0 //'thin'
        } else if (data.coverage >= .33 && data.coverage < .66) {
            coverage = 1 //'medium'
        } else if (data.coverage >=.66) {
            coverage = 2 //'full'
        }

        let metadata = {
            seed: data.id,
            name: data.title,
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