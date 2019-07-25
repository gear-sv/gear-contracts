const fs = require("fs")

const cleanPackage = (projectName) => {
  // 1. read package.json from new project
  fs.readFile(`${process.cwd()}/${projectName}/package.json`, (error, data) => {
    if (error) console.log("### could not read the new project's package.json")

    // 2. remove irrelevant attributes
    const pacakge = JSON.parse(data.toString())
    delete pacakge.bin
    delete pacakge.bugs
    delete pacakge.repository
    delete pacakge.homepage

    // 3. save update
    fs.writeFile(`${process.cwd()}/${projectName}/package.json`, JSON.stringify(pacakge), (error) => {
      if (error) console.log("### could not save package update")     
    })

  })
}

module.exports = cleanPackage
