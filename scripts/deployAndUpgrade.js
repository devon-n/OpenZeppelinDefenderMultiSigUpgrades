const { ethers, upgrades } = require("hardhat")

let boxAddress

async function deploy() {

  const Box = await hre.ethers.getContractFactory("Box")
  const box = await upgrades.deployProxy(Box, [42])
  boxAddress = box.address

  await box.deployed()
  console.log("Box deployed to:", box.address)

}

async function upgrade() {

  const BoxV2 = await hre.ethers.getContractFactory("BoxV2")
  const upgradeBox = await upgrades.upgradeProxy(boxAddress, "BoxV2")

  await upgradeBox.deployed()
  console.log("Box upgraded to:", upgradeBox.address)

}

async function transferToMultiSig() {

  const gnosisSafe = process.env.MULTISIG_ADDRESS
  console.log("Transferring ownership to multi-sig")

  await upgrades.admin.transferProxyAdminOwnership(gnosisSafe)
  console.log("Transferred ownership to: ", gnosisSafe)

}

//  Use defender and gnosis safe to upgrade the contract to V3 after transferring ownership to the mutli sig address

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

upgrade()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

transferToMultiSig()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
