const { ethers, upgrades, defender } = require("hardhat")

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

//  You can use the defender site to propose an upgrade or run the function below

async function proposeUpgrade() {

  const BoxV3 = await ethers.getContractFactory("BoxV3")
  console.log("Preparing proposal...")

  const proposal = await defender.proposeUpgrade(boxAddress, BoxV3, { title: "Upgrade to V3" })
  console.log("upgrade proposal created at: ", proposal.url)

}

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
  
proposeUpgrade()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
