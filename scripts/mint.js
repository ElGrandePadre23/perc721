const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");
const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x3494Dc886Fbb71687ADAb24E98Faf231Fe16F0B5";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("SwissTronikPerc721");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "safeMint";
  const tokenId = 978543215;
  const safeMint = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName,[signer.address,tokenId]),
    0
  );

  await safeMint.wait();

  console.log("Transaction Receipt: ", safeMint.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});