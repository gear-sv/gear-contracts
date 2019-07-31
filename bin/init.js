const fs = require("fs")

const cleanPackage = (projectName, author, version) => {
  // 1. read package.json from new project
  fs.readFile(`${process.cwd()}/${projectName}/package.json`, (error, data) => {
    if (error) console.log("### could not read the new project's package.json")

    // 2. remove irrelevant attributes
    const package = JSON.parse(data.toString())
    delete package.bin
    delete package.bugs
    delete package.repository
    delete package.homepage
    package.name = projectName
    package.version = version
    package.author = author
    package.dependencies = { tape: "^4.11.0" }

    // 3. save updates
    fs.writeFile(`${process.cwd()}/${projectName}/package.json`, JSON.stringify(package), (error) => {
      if (error) console.log("### could not save package update")
    })
  })
}

module.exports = cleanPackage
