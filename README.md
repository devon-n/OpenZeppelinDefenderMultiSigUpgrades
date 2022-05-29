# Using Open Zeppelin Defender to upgrade contracts

This code deploys a simple contract and upgrades it 3 times.

The first time is with hardhat upgrades

We then transfer the contract ownership to a multisig wallet in .env file

The second upgrade sends a proposal to Open Zeppelin defender for other signers to approve

```
npm i
npx hardhat run scripts/deployAndUpgrade.js
```
