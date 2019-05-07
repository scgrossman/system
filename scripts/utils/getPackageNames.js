/* eslint-disable no-console */

const { exec } = require('child_process')
const { userPackageNames, lernaOptions } = require('./parseArgs')

const getPackageNames = (callback, forceUpdatedPackages) => {
  if (!forceUpdatedPackages && userPackageNames.length > 0) {
    callback(userPackageNames)
    return
  }

  exec(`npx lerna ls --json ${lernaOptions.join(' ')}`, (error, stdout) => {
    if (stdout === '') {
      console.log('No components have been changed, nothing to do. Exiting.')
      process.exit(0)
    } else {
      const updatedPackages = JSON.parse(stdout)
      const packageNames = updatedPackages.map(packageObject => packageObject.name)

      callback(packageNames)
    }
  })
}

module.exports = getPackageNames