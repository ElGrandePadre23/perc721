const { ethers } = require("hardhat");

async function main() {
  const perc721 = await ethers.deployContract("SwissTronikPerc721");
    // Wait for the transaction to be mined
  await perc721.waitForDeployment();

  console.log(`SwissTronikPerc721 was deployed to ${await perc721.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

